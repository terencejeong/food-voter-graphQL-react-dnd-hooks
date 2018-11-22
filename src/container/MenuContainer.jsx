import React, { useState, useEffect } from 'react';
import { camys, sambo, gogyo, shiftEateries } from '../utils/foodData';
import Restaurants from '../components/Restaurants';
import Menu from '../components/Menu';


const useFoodMenu = (foodData) => {
  const [menu, setMenu] = useState({...foodData, itemsToShow: 3, expanded: false });
  const expandMenu = () => setMenu({ ...foodData, expanded: true, itemsToShow: foodData.menu.length });
  const closeMenu = () => setMenu({ ...foodData, expanded: false, itemsToShow: 3 });

  return [menu, expandMenu, closeMenu]
};

const MenuContainer = () => {
  const [menuState, setMenu] = useState(false);
  const [camy, expandMenu, closeMenu] = useFoodMenu(camys);
  const [sambos, expandSamboMenu, closeSamboMenu] = useFoodMenu(sambo);
  const [gogyos, expandGogyoMenu, closeGogyoMenu] = useFoodMenu(gogyo);
  const [shiftEatery, expandShiftEatery, closeShiftEatery] = useFoodMenu(shiftEateries);

  return (
    <>
      <Restaurants />
      <div className="menuContainer">
        <Menu restaurant={camy} expandMenu={expandMenu} closeMenu={closeMenu} />
        <Menu restaurant={sambos} expandMenu={expandSamboMenu} closeMenu={closeSamboMenu} />
        <Menu restaurant={gogyos} expandMenu={expandGogyoMenu} closeMenu={closeGogyoMenu} />
        <Menu restaurant={shiftEatery} expandMenu={expandShiftEatery} closeMenu={closeShiftEatery} />
      </div>
      <button onClick={() => setMenu(!menuState)}>open menu </button>
    <div className={menuState ? 'rm-container rm-open' : 'rm-container'}>
      <div className="rm-wrapper">
        <div className="rm-cover">
          <div className="rm-front">
            <div className="rm-content">
            </div>
          </div>
          <div className="rm-back">
            <div className="rm-content">
            </div>
            <div className="rm-overlay"></div>
          </div>
        </div>
        <div className="rm-middle">
          <div className="rm-inner">
            <div className="rm-content">
              <h4>Appetizers</h4>
              <dl>
                <dt>Bella's Artichokes</dt>
                <dd>Roasted artichokes with chipotle aioli and cream cheese</dd>
                <dt><a className="rm-viewdetails">Green Love Crostini</a></dt>
                <dd>Crostini with young pecorino, grilled figs and arugula & mint pesto</dd>
                <dt>Focaccia di Carciofi</dt>
                <dd>Artichoke focaccia with fresh thyme</dd>
              </dl>
              <h4>Salads & More</h4>
              <dl>
              </dl>
            </div>
            <div className="rm-overlay"></div>
          </div>
        </div>
        <div className="rm-right">
          <div className="rm-front">
            <div className="rm-content">
            </div>
          </div>
          <div className="rm-back">
            <div className="rm-content">
            </div>
            <div className="rm-overlay"></div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
};

export default MenuContainer;
