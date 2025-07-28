# CraveKart Context Menu System

This update adds a comprehensive context menu system for storing cart details and food details with persistent storage.

## Features Added

### 1. Context Menu System
- **Right-click on any food item** to open the context menu
- Quick actions: Add to cart, remove from cart, add to favorites, quick order
- Quantity management directly from the menu
- Visual feedback showing current cart status

### 2. Cart Context (State Management)
- **CartProvider**: Global state management for cart, favorites, and user preferences
- **Persistent Storage**: All data is saved to localStorage and restored on app reload
- **Real-time Updates**: Cart summary widget updates instantly when items are added/removed

### 3. Components Added

#### CartSummary
- Floating cart widget in bottom-right corner
- Expandable to show all cart items
- Quick quantity adjustment and item removal
- Direct navigation to cart page

#### ContextMenu
- Right-click menu for food items
- Context-aware actions based on item status
- Smooth animations and responsive design
- Keyboard support (ESC to close)

#### Favorites
- Dedicated favorites page (`/favorites`)
- Save and manage favorite food items
- Context menu integration
- Grid layout with responsive design

#### UserGuide
- Interactive guide explaining how to use the context menu
- Toggle button to show/hide
- Step-by-step instructions

### 4. Enhanced Components

#### Restaurant Page
- Context menu integration for all food items
- Visual indicators showing items already in cart
- Improved quantity management
- Persistent cart state across navigation

#### Header Navigation
- Cart badge showing total items count
- Favorites link
- Responsive design

#### Cart Page
- Integration with context state
- Order history tracking
- Automatic cart clearing after order placement

## How to Use

### Context Menu
1. **Right-click** on any food item in the restaurant page
2. Choose from available actions:
   - **View Details**: See item information
   - **Add to Cart**: Add item to your cart
   - **Quick Order**: Add to cart and go directly to checkout
   - **Add to Favorites**: Save item for later
   - **Increase/Decrease Quantity**: Modify cart quantities

### Cart Management
- Cart data persists across browser sessions
- Real-time cart summary in floating widget
- Click cart summary to expand and see all items
- Quick quantity adjustments from the summary

### Favorites
- Navigate to `/favorites` to see saved items
- Right-click on favorites for context menu
- Add favorite items to cart with one click

## Technical Implementation

### State Management
```javascript
// Cart Context provides global state
const cartState = useCart();
const dispatch = useCartDispatch();

// Helper functions for common operations
cartHelpers.addToCart(dispatch, item, quantity);
cartHelpers.addToFavorites(dispatch, item);
```

### Context Menu Integration
```javascript
// Higher-order component adds context menu to any component
export default withContextMenu(YourComponent);

// In your component, handle right-click events
<div onContextMenu={(e) => onContextMenu && onContextMenu(e, item)}>
```

### Persistent Storage
- All cart data, favorites, and preferences are automatically saved to localStorage
- Data is restored when the app loads
- No manual save/load required

## File Structure
```
src/
├── context/
│   └── CartContext.jsx           # Global state management
├── components/
│   ├── ContextMenu/
│   │   ├── ContextMenu.jsx       # Right-click menu component
│   │   ├── ContextMenu.css       # Menu styling
│   │   └── withContextMenu.jsx   # HOC for context menu
│   ├── CartSummary/
│   │   ├── CartSummary.jsx       # Floating cart widget
│   │   └── CartSummary.css       # Widget styling
│   ├── Favorites/
│   │   ├── Favorites.jsx         # Favorites page
│   │   └── Favorites.css         # Favorites styling
│   └── UserGuide/
│       ├── UserGuide.jsx         # Interactive guide
│       └── UserGuide.css         # Guide styling
```

## Browser Compatibility
- Modern browsers with localStorage support
- Mobile-responsive design
- Touch-friendly context menu (long-press on mobile)

## Future Enhancements
- User accounts and cloud sync
- Advanced filtering in favorites
- Order history page
- Push notifications for order status
- Bulk operations in cart
- Recipe suggestions based on favorites
