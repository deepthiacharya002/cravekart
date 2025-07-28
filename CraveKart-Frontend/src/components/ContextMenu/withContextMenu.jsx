import React, { useState, useCallback } from 'react';
import ContextMenu from '../ContextMenu/ContextMenu';

const withContextMenu = (WrappedComponent) => {
  const WithContextMenuComponent = (props) => {
    const [contextMenu, setContextMenu] = useState({
      isVisible: false,
      position: { x: 0, y: 0 },
      targetItem: null
    });

    const handleContextMenu = useCallback((event, item) => {
      event.preventDefault();
      event.stopPropagation();

      const { clientX, clientY } = event;
      
      // Adjust position to keep menu within viewport
      const menuWidth = 320;
      const menuHeight = 400;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      let x = clientX;
      let y = clientY;
      
      // Adjust horizontal position
      if (x + menuWidth > viewportWidth) {
        x = viewportWidth - menuWidth - 10;
      }
      
      // Adjust vertical position
      if (y + menuHeight > viewportHeight) {
        y = viewportHeight - menuHeight - 10;
      }
      
      // Ensure minimum distance from edges
      x = Math.max(10, x);
      y = Math.max(10, y);

      setContextMenu({
        isVisible: true,
        position: { x, y },
        targetItem: item
      });
    }, []);

    const handleCloseContextMenu = useCallback(() => {
      setContextMenu({
        isVisible: false,
        position: { x: 0, y: 0 },
        targetItem: null
      });
    }, []);

    const contextMenuProps = {
      onContextMenu: handleContextMenu,
      onCloseContextMenu: handleCloseContextMenu,
      contextMenuState: contextMenu
    };

    return (
      <>
        <WrappedComponent 
          {...props} 
          {...contextMenuProps}
        />
        <ContextMenu
          isVisible={contextMenu.isVisible}
          position={contextMenu.position}
          onClose={handleCloseContextMenu}
          targetItem={contextMenu.targetItem}
        />
      </>
    );
  };

  WithContextMenuComponent.displayName = `withContextMenu(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithContextMenuComponent;
};

export default withContextMenu;
