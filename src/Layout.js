import React, { useEffect, useState } from "react";
import Card from "./Components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faXmark,
  faList,
  faGrip,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import Filter from "./Components/Filter";
import { useParams, useNavigate } from "react-router-dom";
import cx from "classnames";
import { ALL_TAB, API_URL, BLOCKED_TAB, OWNER_ID, YOUR_TAB } from "./constants";
import useInfiniteScroll from "./CustomHooks/useInfiniteScroll";

export default function Layout() {
  const params = useParams();
  const navigate = useNavigate();

  const { loadMoreRef, page } = useInfiniteScroll();

  const [cardsData, setCardsData] = useState([]);
  const [renderData, setRenderData] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isListView, setListView] = useState(false);

  const fetchData = () => {
    setLoading(true);
    fetch(API_URL)
      .then((data) => data.json())
      .then((data) => {
        setCardsData([...cardsData, ...data.data]);
        setLoading(false);
      });
  };

  const handleRedirection = (route) => {
    navigate(`/${route}`);
  };

  useEffect(() => {
    fetchData();
    debugger;
  }, [page]);

  useEffect(() => {
    const data = cardsData;
    const tabId = params.tabId;
    if (tabId === YOUR_TAB) {
      setRenderData(data?.filter((itr) => +itr.owner_id === OWNER_ID));
    } else if (tabId === BLOCKED_TAB) {
      setRenderData(data?.filter((itr) => itr.status === "blocked"));
    } else {
      setRenderData(data);
    }
  }, [cardsData, params]);


  return (
    <div className="layout">
      <div className="header">
        <div className="virtual-cards d-flex-c-c">
          <h1>Virtual cards</h1>
          <div>Learn more</div>
        </div>
        <div className="add-card">+ virtual card</div>
      </div>
      <div className="tabs-section">
        <div>
          <div
            className={cx("cur-p", { active: params?.tabId === YOUR_TAB })}
            onClick={() => handleRedirection(YOUR_TAB)}
          >
            Your
          </div>
          <div
            className={cx("cur-p", { active: params?.tabId === ALL_TAB })}
            onClick={() => handleRedirection(ALL_TAB)}
          >
            All
          </div>
          <div
            className={cx("cur-p", { active: params?.tabId === BLOCKED_TAB })}
            onClick={() => handleRedirection(BLOCKED_TAB)}
          >
            Blocked
          </div>
        </div>
        <div>
          <div className="mr-12 cur-p" onClick={() => setListView(!isListView)}>
            <FontAwesomeIcon size="lg" icon={faGrip} />
          </div>
          <div className="cur-p" onClick={() => setListView(!isListView)}>
            <FontAwesomeIcon icon={faList} />
          </div>
        </div>
      </div>
      <div className="filters">
        {!showSearchBar ? (
          <div className="cur-p" onClick={() => setShowSearchBar(true)}>
            <FontAwesomeIcon size="lg" icon={faMagnifyingGlass} />
          </div>
        ) : (
          <div className="search-body">
            <input
              placeholder="search..."
              onChange={({ target }) => {
                setRenderData(
                  cardsData.filter((itr) =>
                    itr.name.toLowerCase().includes(target.value)
                  )
                );
                console.log(renderData,target.value)
              }}
            />
            <div
              className="search-close cur-p"
              onClick={() => setShowSearchBar(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>
        )}
        <Filter data={cardsData} setData={setRenderData} />
      </div>

      {!loading && renderData.length === 0 && <div className="d-flex-c-c">No data found</div> }

      <div className={cx("cards", { "d-flex": !isListView })}>
        {renderData?.map((card,i) => (
          <Card key={`${card.name}-${i}`} data={card} />
        ))}
      </div>

      <div ref={loadMoreRef}>
        {loading && (
          <div className="loading d-flex-c-c">
            <FontAwesomeIcon size="xl" icon={faSpinner} />
          </div>
        )}
      </div>
    </div>
  );
}
