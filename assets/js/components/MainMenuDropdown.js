import React, {Component} from 'react';
import {Dropdown, Modal, Header, Button, Icon, Form, Checkbox, Label} from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default class MainMenuDropdown extends Component {
  constructor(props) {
    super(props);

    this.updateRoom = this.updateRoom.bind(this);

    this.roomNameRef = React.createRef();
    this.generateUrlsRef = React.createRef();

    this.state = {
      showModal: false,
      showRoomModal: false
    }
  }

  updateRoom() {
    const roomName = this.roomNameRef.current.value;
    const checked = this.generateUrlsRef.current.state.checked;
    this.props.updateRoomSettings(roomName, checked);

    this.setState({ ...this.state, showRoomModal: false });
  }

  render() {
    if (this.state.showModal) {
      return (
        <Modal basic open >
          <Header icon='archive' content='Delete local storage' />
          <Modal.Content>
            <p>
              Are you sure? This will permanently delete your keys and messages, revoking access to the room.
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color='red' inverted onClick={() => this.setState({...this.state, showModal: false})}>
              <Icon name='remove' /> No
            </Button>
            <Button color='green' inverted onClick={this.props.burnBrowser} as={Link} to="/">
              <Icon name='checkmark' /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      );
    }
    else if (this.state.showRoomModal) {
      return (
      <Modal basic closeOnDimmerClick={false} size='small' open>
        <Header content='Room settings' />
        <Modal.Content>
          <Form>
            <Form.Field>
              <label style={{color: 'white'}}>Room name</label>
              <input defaultValue={this.props.currentName} ref={this.roomNameRef}/>
            </Form.Field>
            <Form.Field >
              <Checkbox defaultChecked={this.props.generateUrls} label={<label style={{color: 'white'}}>Generate URL previews</label>} ref={this.generateUrlsRef}/>
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' inverted onClick={this.updateRoom}>
            <Icon name='checkmark' /> Accept
          </Button>
        </Modal.Actions>
      </Modal>
      );
    }
    return (
      <Dropdown icon='options' size='large' style={{flex: 0}} direction='left'>
        <Dropdown.Menu>
          <Dropdown.Item text='Change appearance' onClick={this.props.changeName}/>
          <Dropdown.Item text='Room settings' onClick={() => this.setState({...this.state, showRoomModal: true})} />
          <Dropdown.Divider />
          <Dropdown.Item text='Delete local storage' onClick={() => this.setState({...this.state, showModal: true})} />
          <Dropdown.Item text='Exit to main menu' as={Link} to='/' />
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}