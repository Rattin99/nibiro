
# Guide to Creating a Stacking Scroll Effect

This guide explains how the stacking card effect seen on websites like `gethyped.nl` is built and how you can replicate it in a Next.js application.

## 1. How the Original Effect Works

The effect is a sophisticated combination of HTML structure, CSS positioning, and JavaScript-driven animation, orchestrated primarily by the **GreenSock Animation Platform (GSAP)** and its **ScrollTrigger** plugin.

### Core Components:

*   **HTML Structure**: The foundation is a main container holding several "card" or "section" elements.
    ```html
    <div class="expertises-collection">
      <div class="expertises-list">
        <div class="expertises-item">...</div>
        <div class="expertises-item">...</div>
        <div class="expertises-item">...</div>
      </div>
    </div>
    ```

*   **CSS Styling**:
    *   The main container is set as the trigger for the scroll animation.
    *   The "cards" are styled to look like individual panels and are often layered on top of each other using `position: absolute` or `position: fixed`.
    *   Initially, you might see inline styles like `transform`, `opacity`, and `scale` applied to the elements. These are not written manually but are dynamically manipulated by JavaScript.

*   **JavaScript Animation (GSAP & ScrollTrigger)**: This is the engine behind the effect.
    *   **GSAP**: A powerful library for creating high-performance animations.
    *   **ScrollTrigger**: A GSAP plugin that links animations to the user's scroll position.
    *   **Pinning**: `ScrollTrigger` "pins" the main container, making it stick to the screen while the animation inside it plays out. This creates the illusion that the page content is scrolling over the pinned element.
    *   **Animation**: As the user scrolls, GSAP animates the properties of the cards. For the horizontal stacking effect, it animates the `xPercent` (horizontal translation) of each card, moving them from right to left. Other properties like `scale`, `rotate`, and `opacity` are often animated simultaneously to create a more dynamic feel.

---

## 2. Replicating the Effect in Next.js

Here’s how to build a similar horizontal stacking effect for your Next.js components.

### Step 1: Install GSAP

First, add the GSAP library to your Next.js project.

```bash
npm install gsap
# or
yarn add gsap
```

### Step 2: Create a Reusable `StackingComponent`

Create a component that will contain the animation logic and wrap the components you want to stack.

**File: `components/StackingComponent.js`**
```javascript
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const StackingComponent = ({ children }) => {
    const containerRef = useRef(null);
    const sectionRefs = useRef([]);

    // useLayoutEffect is crucial for animations that need DOM measurements
    useLayoutEffect(() => {
        const sections = sectionRefs.current;
        const container = containerRef.current;

        // Use GSAP context for safe cleanup
        const ctx = gsap.context(() => {
            gsap.to(sections, {
                xPercent: -100 * (sections.length - 1),
                ease: "none", // Linear animation tied to scroll
                scrollTrigger: {
                    trigger: container,
                    pin: true, // Pin the container
                    scrub: 1, // Smoothly link animation to scrollbar
                    snap: 1 / (sections.length - 1), // Snap to each section
                    // Set the animation duration based on the container's width
                    end: () => "+=" + container.offsetWidth
                }
            });
        }, container);

        // Cleanup function
        return () => ctx.revert();
    }, [children]); // Rerun if children change

    return (
        <div ref={containerRef} style={{
            position: 'relative',
            height: '100vh',
            width: '100%',
            overflow: 'hidden' // Hide the overflowing children
        }}>
            {/* Map over children to apply styles and refs */}
            {React.Children.map(children, (child, index) => (
                <div
                    ref={el => sectionRefs.current[index] = el}
                    style={{
                        position: 'absolute',
                        top: 0,
                        // Position each child horizontally next to each other
                        left: `${index * 100}%`,
                        width: '100%',
                        height: '100vh',
                    }}
                >
                    {child}
                </div>
            ))}
        </div>
    );
};

export default StackingComponent;
```

### Step 3: Use the Component on Your Page

Now, import the `StackingComponent` and wrap the components you want to animate.

**File: `pages/your-page.js`**
```javascript
import StackingComponent from '../components/StackingComponent';

// 1. Define the components you want to stack
const Component1 = () => (
    <div style={{ backgroundColor: '#ff6b6b', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1>First Component</h1>
    </div>
);

const Component2 = () => (
    <div style={{ backgroundColor: '#f0e68c', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1>Second Component</h1>
    </div>
);

const Component3 = () => (
    <div style={{ backgroundColor: '#87ceeb', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1>Third Component</h1>
    </div>
);


// 2. Create your page and use the StackingComponent
const YourPage = () => {
    return (
        <div>
            {/* Add content before to enable scrolling */}
            <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h1>Scroll Down</h1>
            </div>

            <StackingComponent>
                <Component1 />
                <Component2 />
                <Component3 />
            </StackingComponent>

            {/* Add content after */}
            <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h1>End of Page</h1>
            </div>
        </div>
    );
};

export default YourPage;
```

By following this structure, you create a powerful and reusable stacking component that declaratively animates any children passed to it, keeping your page logic clean and separated from the animation implementation.
