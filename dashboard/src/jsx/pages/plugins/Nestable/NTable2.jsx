import React, { Component } from "react";
import Nestable from "react-nestable";
import 'react-nestable/dist/styles/index.css';

const items = [
   { id: 0, text: "Item 11" },
   {
      id: 1,
      text: "Item 12",
      children: [
         { id: 2, text: "Item 13" },
         { id: 3, text: "Item 14" },
         {
            id: 4,
            text: "Item 15",
            children: [
               { id: 5, text: "Item 16" },
               { id: 6, text: "Item 17" },
               { id: 7, text: "Item 18" },
            ],
         },
         { id: 8, text: "Item 19" },
         { id: 9, text: "Item 20" },
      ],
   },
];

class NTable extends Component {
   state = {
      example: 1,
      defaultCollapsed: false,
   };

   collapse = (collapseCase) => {
      if (this.refNestable) {
         switch (collapseCase) {
            case 0:
               this.refNestable.collapse("NONE");
               break;
            case 1:
               this.refNestable.collapse("ALL");
               break;
            case 2:
               this.refNestable.collapse([1]);
               break;
			default:
				this.refNestable.collapse("NONE");
         }
      }
   };

   renderItem = ({ item, collapseIcon, handler }) => {
      return (
         <div style={{ padding: '6px', margin: '5px 0', backgroundColor: '#0074ff', borderRadius: '4px', color: '#fff' }}>
            {handler}
            {collapseIcon}
            {item.text}
         </div>
      );
   };

   render() {
      const { defaultCollapsed } = this.state;

      return (
         <div className="dd-handle bg-transparent border-0 fw-bold">
            <Nestable 
              color="#0074ff"
               items={items}
               collapsed={defaultCollapsed}
               renderItem={this.renderItem}
               ref={(el) => (this.refNestable = el)}
               maxDepth={30}
            />
         </div>
      );
   }
}

export default NTable;
