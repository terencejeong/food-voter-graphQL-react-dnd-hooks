import React from 'react';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

const Menu = ({ restaurant, expandMenu, closeMenu }) => {
  return (
    <div className="menuItems">
      <p>{restaurant.name}</p>
      <TransitionGroup>
        {restaurant.menu.slice(0, restaurant.itemsToShow).flatMap((food, index) => {
          return (
            <CSSTransition
              key={index}
              timeout={500}
              classNames="fade"
            >
              <ul style={{ listStyleType: 'none' }}>
                <li>
                  {food.title}
                </li>
                <li>
                  ${food.price}
                </li>
                <li>
                  {food.description}
                </li>
              </ul>
            </CSSTransition>
          )
        })}
      </TransitionGroup>
      {
        restaurant.expanded
          ?
            <button onClick={() => closeMenu()}>Show less</button>
          :
            <button onClick={() => expandMenu()}>Show More</button>
      }
    </div>
  )
}

export default Menu;
