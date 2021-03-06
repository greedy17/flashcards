import React, {Component} from 'react';
import axios from 'axios';
import CardViewer from '../components/CardViewer/cardViewer';
import LandingPage from '../components/LandingPage/landingPage';
import './app.css'

class App extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      collections: [],
      collectionNumber: 0,
      cardNumber: 0,
      loading: true,
      currentCollection: 0
      // cardWord:"",
      // cardDefinition:""
    }
    
  };

  componentDidMount() {
    axios.get('http://localhost:5000/api/collections')
    .then(res => {
      const collections = res.data;
      this.setState({
        collections,
        loading: false
      });
    })
  }

  // pushCard(cardWord, cardDefinition){
  //   console.log(cardWord)
  //   console.log(cardDefinition)
  //   let collectionId = this.state.collections[this.state.collectionNumber]._id;
  //   console.log(collectionId);
  //   const cardsUrl = 'http://localhost:5000/api/collections/' + collectionId + '/cards';
  //   // axios({
  //   //   method: 'post',
  //   //   url: cardsUrl,
  //   //   data: {
  //   //     word: cardWord,
  //   //     definition: cardDefinition
  //   //   }
  // //   })
  // // }

   goToNextCard(){
     let tempCardNumber = this.state.cardNumber;
     tempCardNumber++;
     if(tempCardNumber === this.state.collections[this.state.collectionNumber].cards.length){
       tempCardNumber = 0;
     }
     this.setState({
       cardNumber: tempCardNumber
    });
  }

   goToPreviousCard(){
     let tempCardNumber = this.state.cardNumber;
     tempCardNumber--;
     if(tempCardNumber < 0){
       tempCardNumber = this.state.collections[this.state.collectionNumber].cards.length - 1;
     }
     this.setState({
       cardNumber: tempCardNumber
    });
   }

   goToNextCollection(){
    let tempCollectionNumber = this.state.collectionNumber;
    tempCollectionNumber++;
    if(tempCollectionNumber === this.state.collections.length){
      tempCollectionNumber = 0;
    }
    this.setState({
      collectionNumber: tempCollectionNumber,
      cardNumber: 0
   })
   console.log(this.state.collectionNumber);
 }

    goToPreviousCollection(){
      let tempCollectionNumber = this.state.collectionNumber;
      tempCollectionNumber--;
      if(tempCollectionNumber < 0){
        tempCollectionNumber = this.state.collections.length - 1;
      }
      this.setState({
        collectionNumber: tempCollectionNumber,
        cardNumber: 0
    });
    }


   Scroll() {
    window.scroll({
      top: document.body.offsetHeight,
      left: 0, 
      behavior: 'smooth',
    });
  }

  render(){
    if(this.state.loading === true){
      return(<div>Loading...</div>)
    }else{
      return(
        <div className="container-fluid app">
          <LandingPage scroll={()=>this.Scroll()}/>
          <CardViewer
          collectionNumber={this.state.collectionNumber}
          collections={this.state.collections}
          cardNum = {this.state.cardNumber}
          cards={this.state.collections[this.state.collectionNumber].cards}
          nextCard={() => this.goToNextCard()} 
          previousCard={() => this.goToPreviousCard()}
          prevCollection={() => this.goToPreviousCollection()}
          nextCollection={() => this.goToNextCollection()}
          currentCollection = {this.state.currentCollection}
          // handleSubmit={() => this.handleSubmit()}
          //cardWord ={this.state.cardWord}
          //cardDefinition = {this.state.cardDefinition}
          //pushCard = {() => this.pushCard()}
          />
        </div>
      )
    }
  }
}

export default App;