import React, { useState, useEffect } from "react";
import { MoveableComponent } from "./components/MoveableComponent";
import { getImages } from "./services/getImages";

const App = () => {
  const [moveableComponents, setMoveableComponents] = useState([]);
  const [selectedToRemove, setselectedToRemove] = useState();
  const [selected, setSelected] = useState(null);
  const [containerLimits, setContainerLimits] = useState({});

  useEffect(() => {
    function updateSize() {
      setContainerLimits({
        width:document.getElementById("parent").clientWidth,
        height:document.getElementById("parent").clientHeight,
      });
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const addMoveable = () => {
    // Create a new moveable component and add it to the array
    const COLORS = ["red", "blue", "yellow", "green", "purple"];

    setMoveableComponents([
      ...moveableComponents,
      {
        id: Math.floor(Math.random() * Date.now()),
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        updateEnd: true
      },
    ]);
  };

  const updateMoveable = (id, newComponent, updateEnd = false) => {
    const updatedMoveables = moveableComponents.map((moveable, i) => {
      if (moveable.id === id) {
        return { id, ...newComponent, updateEnd };
      }
      return moveable;
    });
    setMoveableComponents(updatedMoveables);
  };

  const removeMoveable = () => {
    const updatedMoveables = moveableComponents.filter(
      (moveable) => selectedToRemove != moveable.id
    );
    setMoveableComponents(updatedMoveables);
  };

  const handleChange = (e) => {
    setselectedToRemove(e.target.value)
  }

  return (
    <main style={{ height : "100vh", width: "100vw" }}>
      <button onClick={addMoveable}>Add Moveable1</button>
      <div>
        <label>
          Delete Moveable:
          <select name="selectMoveable" onChange={handleChange}>
            {moveableComponents.map((item, index) => (
              <option value={item.id} key={index}>{item.id} - {item.color}</option>
            ))}
          </select>
        </label>
        <button onClick={removeMoveable}>Delete</button>
      </div>
      <div
        id="parent"
        style={{
          position: "relative",
          background: "black",
          height: "80vh",
          width: "80vw",
        }}
      >
        {moveableComponents.map((item, index) => (
          <MoveableComponent
            {...item}
            containerLimits={containerLimits}
            key={index}
            updateMoveable={updateMoveable}
            setSelected={setSelected}
            isSelected={selected === item.id}
          />
        ))}
      </div>
    </main>
  );
};

export default App;

