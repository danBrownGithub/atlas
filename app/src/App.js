import './App.css';
import ThingsTab from './components/tabs/ThingsTab';
import RelationsTab from './components/tabs/RelationsTab';
import ServicesTab from './components/tabs/ServicesTab';
import AppManager from './components/AppManager';
import AppsTab from './components/tabs/AppsTab';
import RecipesTab from './components/tabs/RecipeTab';

function App() {
  return (
    <div className="App-bg">
      <section className='Grid'>
        <ServicesTab></ServicesTab>
      </section>

      <section className='Grid'>
        <RelationsTab></RelationsTab>
      </section>

      <section className='Grid'>
        <ThingsTab ></ThingsTab>
      </section>

      <section className='Grid'>
        <RecipesTab></RecipesTab>
      </section>

      <section className='Grid'>
        <AppsTab></AppsTab>
      </section>

      <section className='Grid'>
        <AppManager></AppManager>
      </section>

    </div>
  );
}

export default App;
