import React, { useRef } from "react";
import Moveable from "react-moveable";

export const MoveableComponent = ({
    updateMoveable,
    top,
    left,
    width,
    height,
    color,
    id,
    setSelected,
    isSelected = false,
    containerLimits
  }) => {
    const ref = useRef();
    
    const onResize = (e) => {    
      e.target.style.width = `${e.width}px`;
      e.target.style.height = `${e.height}px`;
      e.target.style.transform = e.drag.transform;
    };
  
    return (
      <>
        <div
          ref={ref}
          className="draggable"
          id={"component-" + id}
          style={{
            position: "absolute",
            top: top,
            left: left,
            width: width,
            height: height,
            background: color,
          }}
          onClick={() => setSelected(id)}
        >
          <div className="id_moveable">
            {id}
          </div>
        </div>
  
        <Moveable
          target={isSelected && ref.current}
          bounds={{ left: 0, top: 0, bottom: containerLimits.height, right: containerLimits.width }}
          resizable
          snappable={true}
          draggable
          onDrag={(e) => {
            updateMoveable(id, {
              top: e.top,
              left: e.left,
              width,
              height,
              color,
            });
          }}
          onResize={(e) => onResize(e)}
          keepRatio={false}
          throttleResize={1}
          renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
          edge={false}
          zoom={1}
          origin={false}
          padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
        />
      </>
    );
  };
  
