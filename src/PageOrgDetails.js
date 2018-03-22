import React from 'react';
import { 
  BrowserRouter as Router, 
  Route } from 'react-router-dom';
import axios from 'axios';

import addLight from './assets/icon-add-light.svg';
import Header from './components/Header/Header';
import ButtonWithIcon from './components/ButtonWithIcon/ButtonWithIcon';
import FormOrgDetails from './components/FormOrgDetails/FormOrgDetails';
import OrgDetail from './components/OrgDetail/OrgDetail';

class PageOrgDetails extends React.Component {
  state = {
    details: [],
    id: false,
    visible: false
  }

  refresh = () => {
    axios
    .get('/org-details')
    .then(res => {
      console.log(res.data.payload)
      const details = res.data.payload;
      this.setState({
        details
      })
    });
  }

  showForm = e => {
    e.preventDefault();
    this.setState({
      visible: true
    })
  }

  hideForm = () => (
    this.setState({
      visible: false
    })
  )
  
  componentDidMount() {
    this.refresh();
  }

  render() {
    return(
      <main className="page__org-details">
        <Header />

        <section className="page__org-details__container">
          <ButtonWithIcon type={addLight} text="Add a Field" action={this.showForm}/>

          {this.state.visible ?
            <FormOrgDetails name="form-org-info" id="form-org-info" />
            : null }
            
       
          <ul className="org-details__index">
          {this.state.details.map(detail => (
            <li key={detail._id}><a href={`#${detail.title}`}>{detail.title}</a></li>))}
          </ul>
          
          {this.state.details.map(detail => (
            <OrgDetail 
              key={detail._id} 
              title={detail.title}
              text={detail.text} />
            
            ))}

        
          

        </section>

      </main>

    )
  }
}

export default PageOrgDetails;

