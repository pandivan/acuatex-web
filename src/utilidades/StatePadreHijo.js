// // Child.jsx
// class Child extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return (
//             <button 
//                 type="button" 
//                 onClick={ this.props.updateParent }
//             >
//             Update Parent
//             </button>
//         );  
//     }
// }

// // Parent.jsx
// class Parent extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             shown: true
//         };
//     }
//     updateState() {
//         this.setState({ shown: false });
//     }
//     render() {
//         return (
//             <Child 
//                 updateParent={ this.updateState.bind(this) } 
//             />
//         );
//     }
// }

// ReactDOM.render(<Parent />, document.getElementById("root"));