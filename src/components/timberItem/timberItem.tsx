import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { RootState } from "../../store/store";
import { timberAddFavorite, timberAddToDeal } from "../timberList/timberSlice";
import ITimberList from "../../types/timbers";
import timber from "../img/timber.png";
import geo from "../img/geo.svg";
import heart from "../img/heart.svg";
import activeHeart from "../img/heartActive.svg";
import { createSelector } from "@reduxjs/toolkit";
const TimberItem = ({
  id,
  type,
  name,
  location,
  seller,
  productType,
  descr,
  cost,
  amount,
}: ITimberList): JSX.Element => {
  const dispatch = useDispatch();
  const selectTimberData = createSelector(
    (state: RootState) => state,
    (state) => ({
      activeFavorites: state.timbers.timbers.favorites,
      activeDeal: state.timbers.timbers.deal,
      activePaid: state.timbers.timbers.paid,
      selector: state.timbers.selector,
      types: state.types.type,
    })
  );
  const { activeFavorites, activeDeal, activePaid, selector, types } =
    useSelector(selectTimberData);
  const ID = Number(id);
  const [paymentstatusUI, setPaymentstatusUI] = useState<
    "Добавить в сделки" | "Оплатить" | "Оплачено"
  >("Добавить в сделки");
  const [inProp, setInProp] = useState<boolean>(false);
  const nodeRef = useRef(null); // HOW IT WORKS

  useEffect(() => {
    setInProp(false);
    const timeout = setTimeout(() => setInProp(true), 100);
    if (selector === "deal") {
      !activePaid.includes(ID)
        ? setPaymentstatusUI("Оплатить")
        : setPaymentstatusUI("Оплачено");
      return;
    } else {
      setPaymentstatusUI("Добавить в сделки");
    }
    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [selector, types]);

  function paymentsChange(id: number): void {
    if (paymentstatusUI !== "Оплачено") {
      dispatch(timberAddToDeal(id));
    }
  }
  return (
    <>
      <CSSTransition
        in={inProp}
        timeout={300}
        classNames="fade"
        nodeRef={nodeRef}
        unmountOnExit
      >
        <li className="list-item" id={id} ref={nodeRef}>
          <div className="list-item-info">
            <img src={timber} alt="" className="list-item-img" />
            <div className="list-item-info-descr">
              <h3 className="type-of-offer">{type}</h3>
              <p className="name-of-timber">{name}</p>
              <div className="location">
                <img src={geo} alt="" style={{ height: 15, width: 15 }} />
                <p className="location-info">{location}</p>
              </div>
              <div className="seller">
                Продавец <span className="seller-comp"> {seller}</span>
              </div>
              <div className="block-type-of-product">
                <p className="title-type-of-product">Вид товара</p>
                <p className="type-of-product">{productType}</p>
              </div>
              <p className="desrc">{descr}</p>
            </div>
          </div>
          <div className="list-item-right">
            <p className="cost">{cost} $</p>
            <div className="amount-and-cost-for-one">
              <p className="amount-and-cost-for-one-left">Количество</p>
              <p className="amount-and-cost-for-one-right">{amount}</p>
            </div>
            <div className="amount-and-cost-for-one">
              <p className="amount-and-cost-for-one-left">Стоимость за штуку</p>
              <p className="amount-and-cost-for-one-right">11 000 $</p>
            </div>
            <div className="add-to-deal-btn">
              <button
                disabled={paymentstatusUI === "Оплачено"}
                className={
                  activePaid.includes(ID)
                    ? "button-add-after-payment"
                    : activeDeal.includes(ID)
                    ? `button-add-to-deal-active`
                    : `button-add-to-deal`
                }
                onClick={() => paymentsChange(ID)}
              >
                {paymentstatusUI}
              </button>
              <button
                className={`${
                  activeFavorites.includes(ID)
                    ? `button-add-to-favorite-active`
                    : `button-add-to-favorite`
                }`}
                onClick={() => dispatch(timberAddFavorite(ID))}
              >
                <img
                  className="fill-heart"
                  src={`${activeFavorites.includes(ID) ? activeHeart : heart}`}
                  alt=""
                />
              </button>
            </div>
          </div>
        </li>
      </CSSTransition>
    </>
  );
};
export default TimberItem;
