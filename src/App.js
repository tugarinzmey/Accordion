import React, { useState, createContext, useContext } from "react";
import './App.css';

const AccordionContext = createContext();
const ItemContext = createContext();

function AccordionItemHeader({children}){
  console.log("itemHeader render");

  const {onClick, selectedKey} = useContext(AccordionContext);
  const eventKey = useContext(ItemContext);
  let className = selectedKey === eventKey ? "header active" : "header"
  return(
    <>
    <div className = {className} onClick={() => onClick(eventKey)}>
      {children}
      <img src="https://www.svgrepo.com/show/16711/right-arrow.svg"></img>
    </div>
    </>
  );
}

function AccordionItemBody({children}){
  console.log("itemBody render");

  const {_, selectedKey} = useContext(AccordionContext);
  const eventKey = useContext(ItemContext);
  let className = selectedKey === eventKey ? "accordion-body active" : "accordion-body";
  return(
    <>
      <div className={className}>
        {children}
      </div>
    </>
  );
}

function AccordionItem({children, eventKey}){
  console.log("item render");

  return(
    <ItemContext.Provider value={eventKey}>
      <div className="item">
        {children}
      </div>
    </ItemContext.Provider>
  );
}

function MarkAccordion({children}) {
  console.log("accordion render");

  const [selectedKey, setSelectedKey] = useState(0);
  function onClick(key){
    setSelectedKey(key);
    key === selectedKey ? setSelectedKey(0) : setSelectedKey(key);
  }
  return (
    <AccordionContext.Provider value={{onClick, selectedKey}}>
    <div className="accordion">
      {children}
    </div>
  </AccordionContext.Provider>
  );
}

function App() {
  return (
    <div className="ramka">
      <MarkAccordion>
        <AccordionItem eventKey={1}>
          <AccordionItemHeader>First</AccordionItemHeader>
          <AccordionItemBody> I am first</AccordionItemBody>
        </AccordionItem>
        <AccordionItem eventKey={2}>
          <AccordionItemHeader>Second</AccordionItemHeader>
          <AccordionItemBody> I am second</AccordionItemBody>
        </AccordionItem>
      </MarkAccordion>
    </div>
  );
}

export default App;