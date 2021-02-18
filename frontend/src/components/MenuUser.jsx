import React from 'react'
import { Drawer, ButtonToolbar, Button, Placeholder } from 'rsuite'
import WorkState from './WorkState'
import '../../node_modules/rsuite/dist/styles/rsuite-default.css'

export default class MenuUser extends React.Component{
   constructor(props) {
     super(props);
     this.state = {
       show: false
     };
     this.close = this.close.bind(this);
     this.toggleDrawer = this.toggleDrawer.bind(this);
     
   }
   close() {
     this.setState({
       show: false
     });
   }
   toggleDrawer() {
     this.setState({ show: true });
     this.props.getWorks()
   }
   
   render() {
     return (
       <div>
         <ButtonToolbar>
           <Button onClick={this.toggleDrawer}>Open</Button>
         </ButtonToolbar>
         <Drawer
           show={this.state.show}
           onHide={this.close}
         >
           <Drawer.Header>
             <Drawer.Title>Drawer Title</Drawer.Title>
           </Drawer.Header>
           <Drawer.Body>
             <WorkState />
           </Drawer.Body>
           <Drawer.Footer>
             <Button onClick={this.close} appearance="primary">Confirm</Button>
             <Button onClick={this.close} appearance="subtle">Cancel</Button>
           </Drawer.Footer>
         </Drawer>
       </div>
     );
   } 
}