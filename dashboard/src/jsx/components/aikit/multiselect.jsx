import React from "react";

import Select from "react-select";

const colourOptions = [
        { value: "Watercolor", label: "Watercolor", isFixed: true },
        { value: "Vector Art", label: "Vector Art",  isFixed: true},
        { value: "Portrait", label: "Portrait", },
        { value: "Pencil Drawing", label: "Pencil Drawing",  isFixed: true },
        { value: "Digital Painting", label: "Digital Painting", },
        { value: "Abstract", label: "Abstract", },
        { value: "Oil Painting", label: "Oil Painting", },
        { value: "Cartoon", label: "Cartoon", },
        { value: "Black And White", label: "Black And White", },
     ]; 

const CustomClearText = () => "  ";
const ClearIndicator = (props) => {
   const {
      children = <CustomClearText />,
      getStyles,
      innerProps: { ref, ...restInnerProps },
   } = props;
   return (
      <div
         {...restInnerProps}
         ref={ref}
         style={getStyles("clearIndicator", props)}
      >
         <div style={{ padding: "0px 5px" }} className="clearallselect">{children}</div>
      </div>
   );
};

const ClearIndicatorStyles = (base, state) => ({
   ...base,
   cursor: "pointer",
   color: state.isFocused ? "blue" : "black",
});

export default function Aikittaify() {
   return (
      <Select
         className="select2dark"
         closeMenuOnSelect={false}
         components={{ ClearIndicator }}
         styles={{ clearIndicator: ClearIndicatorStyles }}
         defaultValue={[colourOptions[0],colourOptions[1], colourOptions[2],colourOptions[3],colourOptions[4], colourOptions[5], colourOptions[6], colourOptions[7], colourOptions[8]]}
         isMulti
         options={colourOptions}
      />
   );
}
