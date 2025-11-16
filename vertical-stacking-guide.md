
# Guide to Creating a Vertical Stacking Card Effect

This guide provides a detailed breakdown of the "stack of cards" scroll effect seen on modern websites and shows how to replicate it in a Next.js application.

---

## 1. Deconstructing the Effect

The effect is a "stack of cards" where, as the user scrolls, the top card animates away (e.g., scales down, rotates, and fades) to reveal the next card in the stack. This is orchestrated by the **GreenSock Animation Platform (GSAP)** and its **ScrollTrigger** plugin.

### How It Works:

*   **Pinning**: The entire section containing the cards is "pinned" using `ScrollTrigger`. This makes it stick to the screen for a set scroll distance, allowing the animation to play out without the page scrolling past it.
*   **The `pin-spacer` Div**: You may notice a `<div class="pin-spacer">` in the browser's developer tools. This element is automatically created by ScrollTrigger to occupy the space of the pinned element, preventing the page layout from breaking.
*   **Stacking Context**: The cards are layered on top of each other using CSS `position: absolute`. The `z-index` property is used to control the stacking order.
*   **Dynamic Animation**: As the user scrolls through the pinned section, GSAP dynamically applies inline CSS styles to the top-most card. It animates properties like `transform` (to scale and rotate the card) and `opacity` (to fade it out), creating the illusion that it's moving away to reveal the card beneath it.

---

## 2. Replicating the Effect in Next.js

Here’s a step-by-step guide to build this effect in a Next.js project.

### Step 1: Install GSAP

First, add the GSAP library to your project.
```bash
npm install gsap
```

### Step 2: Create the `CardStack` Component

This reusable component will manage the animation logic for any children passed to it.

**File: `components/CardStack.js`**
```javascript
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CardStack = ({ children }) => {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const container = containerRef.current;
        const cards = gsap.utils.toArray(".card-item");

        const ctx = gsap.context(() => {
            // Pin the main container
            ScrollTrigger.create({
                trigger: container,
                pin: true,
                start: "top top",
                // Set the scroll distance needed for the full animation
                end: () => "+=" + (cards.length * 500),
                scrub: 1,
            });

            // Animate each card away as the user scrolls
            cards.forEach((card, index) => {
                // We don't need to animate the last card
                if (index < cards.length - 1) {
                    gsap.to(card, {
                        scale: 0.9 - (index * 0.05), // Progressively scale down
                        yPercent: 5,                 // Move down slightly
                        rotationX: -10,              // Add a 3D rotation
                        opacity: 0.5,                // Fade out
                        scrollTrigger: {
                            trigger: container,
                            start: () => `top+=${index * 500} top`,
                            end: () => `top+=${(index + 1) * 500} top`,
                            scrub: 1,
                        },
                    });
                }
            });
        }, container);

        // Cleanup function
        return () => ctx.revert();
    }, [children]);

    return (
        <div ref={containerRef} className="card-stack-container">
            {React.Children.map(children, (child, index) => (
                <div className="card-item" style={{ zIndex: children.length - index }}>
                    {child}
                </div>
            ))}
        </div>
    );
};

export default CardStack;
```

### Step 3: Add Global CSS

Add the following styles to your global CSS file (e.g., `styles/globals.css`) to position the cards correctly.

```css
.card-stack-container {
    position: relative;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* This is important for the 3D rotation effect */
    perspective: 1000px;
}

.card-item {
    position: absolute;
    width: 80%;
    max-width: 800px;
    height: 80vh;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    transform-origin: center center;
}
```

### Step 4: Use the Component on Your Page

Finally, import and use the `CardStack` component, passing your custom components as children.

**File: `pages/your-page.js`**
```javascript
import CardStack from '../components/CardStack';

// 1. Define the components for the cards
const Card1 = () => <div style={{ backgroundColor: '#e0f7fa', height: '100%', padding: '2rem' }}><h2>Card 1</h2></div>;
const Card2 = () => <div style={{ backgroundColor: '#fff9c4', height: '100%', padding: '2rem' }}><h2>Card 2</h2></div>;
const Card3 = () => <div style={{ backgroundColor: '#fce4ec', height: '100%', padding: '2rem' }}><h2>Card 3</h2></div>;

// 2. Create your page and use the CardStack
const MyPage = () => {
    return (
        <div>
            {/* Add content before to enable scrolling */}
            <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h1>Scroll down to see the card stack</h1>
            </div>

            <CardStack>
                <Card1 />
                <Card2 />
                <Card3 />
            </CardStack>

            {/* Add content after */}
            <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h1>End of the page</h1>
            </div>
        </div>
    );
};

export default MyPage;
```
