import React from "react";

const DropDown = ({ title, options, func }) => {
  return (
    <div className="select">
      <select defaultValue="0" onChange={func}>
        <option className="flex items-center justify-center" value="0" disabled>
          {title}
        </option>
        {options.map((o, i) => (
          <option className="hover:bg-secondary " key={i} value={o}>
            {o.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
