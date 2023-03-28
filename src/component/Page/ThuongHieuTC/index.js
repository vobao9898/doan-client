import React, { useState, useEffect } from "react";
import "./index.scss";
import * as giayAPI from "./../../../api/giay";
import * as apiKM from "./../../../api/khuyen_mai";
import { Link, useHistory } from "react-router-dom";
import * as apiGiay from "./../../../api/giay";
import * as apiMauSac from "./../../../api/mausac";
import * as apiImage from "../../../contants/index";
import Pagination from "react-js-pagination";
import Loadding from "./../../../loadding/index";
import Moment from "moment";
function ThuongHieuTC(props) {
  const [dataKM, setDataKM] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [allPage, setAllPage] = useState(0);
  const [data, setData] = useState([]);
  const [dataTam, setDataTam] = useState([]);
  const [dataTamAll, setDataTamAll] = useState([]);
  const history = useHistory();
  const [isActive, setActive] = useState("");
  const [isLoading, setIsLoadding] = useState(false);
  const [tu, settu] = useState('');
  const [den, setden] = useState('');
  const [mauSac, setMauSac] = useState([]);

  const [dataPost, setDataPost] = useState({
    id_loai_giay: 41,
    sortBy: "ten_giay",
    groupBy: "DESC",
    limit: 12,
    offset: 0,
  });

  async function getMauSac() {
    await apiMauSac.getMauSac().then((res) => {
      if (res.data.success === 1) {
        setMauSac(res.data.data);
      }
    });
  }
  useEffect(() => {
    getMauSac();
  }, []);

  useEffect(() => {
    settu(props?.match?.params?.from && props?.match?.params?.from);
    setden(props?.match?.params?.to && props?.match?.params?.to);
    if (props.match.params) {
      setDataPost((dataPost) => ({
        ...dataPost,
        id_loai_giay: parseInt(props.match.params.th),
      }));
      function fetchPostsLists() {
        if (props.match.params.SortBy && props.match.params.page) {
          let pageN = 0;
          setIsLoadding(true);
          if (parseInt(props.match.params.page) === 1) {
            pageN = 0;
          } else {
            pageN = parseInt(props.match.params.page) * 12 - 12;
          }
          setActivePage(parseInt(props.match.params.page));
          giayAPI
            .getProductsPageByLG({
              id_loai_giay: parseInt(props.match.params.th),
              sortBy: props.match.params.SortBy,
              groupBy: props.match.params.GroupBy,
              idMauSac: props?.match?.params?.idMauSac,
              to: props?.match?.params?.to,
              from: props?.match?.params?.from,
              limit: 12,
              offset: pageN,
            })
            .then((res) => {
              const { data } = res;
              if (res.status === 200) {
                setDataTam(data.data);
                giayAPI
                  .productsAllByLG({
                    id_loai_giay: parseInt(props.match.params.th),
                    sortBy: props.match.params.SortBy,
                    groupBy: props.match.params.GroupBy,
                    idMauSac: props?.match?.params?.idMauSac,
                    to: props?.match?.params?.to,
                    from: props?.match?.params?.from,
                    limit: 12,
                    offset: pageN,
                  })
                  .then((resP) => {
                    const dataAll = resP.data;

                    if (resP.status === 200) {
                      setDataTamAll(dataAll.data);
                      if (
                        props?.match?.params?.idMauSac &&
                        parseInt(props?.match?.params?.idMauSac)
                      ) {
                        apiGiay
                          .getProductsPageByLGs({
                            id_loai_giay: parseInt(props.match.params.th),
                            sortBy: props.match.params.SortBy,
                            groupBy: props.match.params.GroupBy,
                            idMauSac: props?.match?.params?.idMauSac,
                            to: props?.match?.params?.to,
                            from: props?.match?.params?.from,
                            limit: 12,
                            offset: pageN,
                          })
                          .then((res) => {
                            if (res.status === 200) {
                              console.log(res.data)
                              setAllPage(res.data.data.length);
                              setIsLoadding(false);
                            }
                          });
                      } else {
                        apiGiay.getGiay().then((resP) => {
                          const dataLG = resP.data;
                          if (resP.status === 200) {
                            const dataG = dataLG.data.filter(
                              (item) =>
                                item.id_loai_giay ===
                                parseInt(props.match.params.th)
                            );
                            setAllPage(dataG.length);
                            setIsLoadding(false);
                          }
                        });
                      }
                    }
                  });
              }
            });
        } else {
          setIsLoadding(true);
          giayAPI
            .getProductsPageByLG({
              id_loai_giay: parseInt(props.match.params.th),
              sortBy: "ten_giay",
              groupBy: "DESC",
              limit: 12,
              offset: 0,
              idMauSac: props?.match?.params?.idMauSac,
            })
            .then((res) => {
              const { data } = res;
              if (res.status === 200) {
                setDataTam(data.data);
                giayAPI
                  .productsAllByLG({
                    id_loai_giay: parseInt(props.match.params.th),
                    sortBy: "ten_giay",
                    groupBy: "DESC",
                    limit: 12,
                    offset: 0,
                    idMauSac: props?.match?.params?.idMauSac,
                  })
                  .then((resP) => {
                    const dataAll = resP.data;
                    if (resP.status === 200) {
                      setDataTamAll(dataAll.data);
                      setIsLoadding(false);
                    }
                  });
              }
            });
          apiGiay.getGiay().then((resP) => {
            const dataLG = resP.data;
            if (resP.status === 200) {
              const dataG = dataLG.data.filter(
                (item) => item.id_loai_giay === parseInt(props.match.params.th)
              );
              setAllPage(dataG.length);
            }
          });
        }
      }

      fetchPostsLists();
    }
     apiKM
      .getNow({ date_now: Moment(Date()).format("YYYY-MM-DD HH:mm") })
      .then((res) => {
        console.log(res)
        const { data } = res;
        if (res.status === 200) {
          setDataKM(data.data);
          setIsLoadding(false);
        }
      });
    return () => (setDataTam([]), setDataTamAll([]));
  }, [props.match.params]);

  useEffect(() => {
    let current = true;
    if (dataTam?.length > 0 && dataTamAll?.length > 0) {
      let dataTLG = [];
      dataTam.forEach((giay) => {
        const mauTam = [];
        const filterMS = dataTamAll.filter((it) => it.id_giay === giay.id);
        filterMS.forEach((i) => {
          const s = dataTamAll.filter((item) => item.id === i.id);
          if (mauTam.length > 0) {
            let dem = 0;
            mauTam.forEach((ms) => {
              if (ms.id === i.id) {
                dem++;
              }
            });
            if (dem === 0) {
              const m = {
                id: i.id,
                id_giay: i.id_giay,
                id_mau_sac: i.id_mau_sac,
                hinh_anh: i.hinh_anh,
                ten_mau_sac: i.ten_mau_sac,
                size: s,
              };
              mauTam.push(m);
            }
          } else if (mauTam.length === 0) {
            const m = {
              id: i.id,
              id_giay: i.id_giay,
              id_mau_sac: i.id_mau_sac,
              hinh_anh: i.hinh_anh,
              ten_mau_sac: i.ten_mau_sac,
              size: s,
            };
            mauTam.push(m);
          }
        });
        const g = {
          id: giay.id,
          ten_giay: giay.ten_giay,
          mo_ta: giay.mo_ta,
          id_loai_giay: giay.id_loai_giay,
          gia_ban: giay.gia_ban,
          gia_ban_khuyen_mai: giay.gia_ban_khuyen_mai,
          trang_thai: giay.trang_thai,
          mausac: mauTam,
        };
        dataTLG.push(g);
      });
      setData(dataTLG);
    } else {
      setData([]);
    }
    return () => (current = false);
  }, [dataTam, dataTamAll]);
    
  function handlePageChange(pageNumber) {
    if (props.match.params.SortBy && props.match.params.page) {
      history.push(
        `/ThuongHieu=${props.match.params.th}&&SortBy=${
          props.match.params.SortBy
        }&&GroupBy=${props.match.params.GroupBy}&&MauSac=${
          props.match.params.idMauSac ? props.match.params.idMauSac : 0
        }&&From=${
          props.match.params.from ? props.match.params.from : 0
        }&&To=${
          props.match.params.to ? props.match.params.to : 0
        }&&Page=${pageNumber}`
      );
    } else {
      history.push(
        `/ThuongHieu=${
          props.match.params.th
        }&&SortBy=${"ten_giay"}&&GroupBy=${"DESC"}&&MauSac=${
          props.match.params.idMauSac ? props.match.params.idMauSac : 0
        }&&From=${
          props.match.params.from ? props.match.params.from : 0
        }&&To=${
          props.match.params.to ? props.match.params.to : 0
        }&&Page=${pageNumber}`
      );
    }
  }

  function sortby(data, id, tu, den) {
    if (data === "alpha-asc") {
      setActive("alpha-asc");
      history.push(
        `/ThuongHieu=${
          props.match.params.th
        }&&SortBy=${"ten_giay"}&&GroupBy=${"asc"}&&MauSac=${
          id
            ? id
            : props.match.params.idMauSac
            ? props.match.params.idMauSac
            : 0
        }&&From=${
          tu
            ? tu
            : props.match.params.from
            ? props.match.params.from
            : 0
        }&&To=${
          den
            ? den
            : props.match.params.to
            ? props.match.params.to
            : 0
        }&&Page=${1}`
      );
    } else if (data === "alpha-desc") {
      setActive("alpha-desc");
      history.push(
        `/ThuongHieu=${
          props.match.params.th
        }&&SortBy=${"ten_giay"}&&GroupBy=${"desc"}&&MauSac=${
          id
            ? id
            : props.match.params.idMauSac
            ? props.match.params.idMauSac
            : 0
        }&&From=${
          tu
            ? tu
            : props.match.params.from
            ? props.match.params.from
            : 0
        }&&To=${
          den
            ? den
            : props.match.params.to
            ? props.match.params.to
            : 0
        }&&Page=${1}`
      );
    } else if (data === "date_create-desc") {
      setActive("date_create-desc");
      history.push(
        `/ThuongHieu=${
          props.match.params.th
        }&&SortBy=${"date_create"}&&GroupBy=${"desc"}&&MauSac=${
          id
            ? id
            : props.match.params.idMauSac
            ? props.match.params.idMauSac
            : 0
        }&&From=${
          tu
            ? tu
            : props.match.params.from
            ? props.match.params.from
            : 0
        }&&To=${
          den
            ? den
            : props.match.params.to
            ? props.match.params.to
            : 0
        }&&Page=${1}`
      );
    } else if (data === "price-asc") {
      setActive("price-asc");
      history.push(
        `/ThuongHieu=${
          props.match.params.th
        }&&SortBy=${"gia_ban"}&&GroupBy=${"asc"}&&MauSac=${
          id
            ? id
            : props.match.params.idMauSac
            ? props.match.params.idMauSac
            : 0
        }&&From=${
          tu
            ? tu
            : props.match.params.from
            ? props.match.params.from
            : 0
        }&&To=${
          den
            ? den
            : props.match.params.to
            ? props.match.params.to
            : 0
        }&&Page=${1}`
      );
    } else if (data === "price-desc") {
      setActive("price-desc");
      history.push(
        `/ThuongHieu=${
          props.match.params.th
        }&&SortBy=${"gia_ban"}&&GroupBy=${"desc"}&&MauSac=${
          id
            ? id
            : props.match.params.idMauSac
            ? props.match.params.idMauSac
            : 0
        }&&From=${
          tu
            ? tu
            : props.match.params.from
            ? props.match.params.from
            : 0
        }&&To=${
          den
            ? den
            : props.match.params.to
            ? props.match.params.to
            : 0
        }&&Page=${1}`
      );
    }else{
      setActive("alpha-desc");
      history.push(
        `/ThuongHieu=${
          props.match.params.th
        }&&SortBy=${"ten_giay"}&&GroupBy=${"desc"}&&MauSac=${
          id
            ? id
            : props.match.params.idMauSac
            ? props.match.params.idMauSac
            : 0
        }&&From=${
          tu
            ? tu
            : props.match.params.from
            ? props.match.params.from
            : 0
        }&&To=${
          den
            ? den
            : props.match.params.to
            ? props.match.params.to
            : 0
        }&&Page=${1}`
      );
    }
  }

  function renderContent() {
    if (isLoading) {
      return (
        <div className="isLoading">
          <Loadding type={`bubbles`} color={`#333`}></Loadding>
        </div>
      );
    } else {
      return (
        <div className="ThuongHieuTC">
          <div className="ThuongHieuTC_css">
            <div className="p-4">
              <div className="sort-cate clearfix margin-bottom-10 hidden-xs">
                <div className="sort-cate-left hidden-xs">
                  <h3>Xếp theo:</h3>
                  <ul>
                    <li
                      className={
                        isActive === "alpha-asc"
                          ? "active btn-quick-sort alpha-asc"
                          : null
                      }
                    >
                      <a onClick={() => sortby("alpha-asc")} title="Tên A-Z">
                        <i></i>Tên A-Z
                      </a>
                    </li>
                    <li
                      className={
                        isActive === "alpha-desc"
                          ? "active btn-quick-sort alpha-desc"
                          : null
                      }
                    >
                      <a onClick={() => sortby("alpha-desc")} title="Tên Z-A">
                        <i></i>Tên Z-A
                      </a>
                    </li>
                    <li
                      className={
                        isActive === "date_create-desc"
                          ? "active btn-quick-sort date_create-desc"
                          : null
                      }
                    >
                      <a
                        onClick={() => sortby("date_create-desc")}
                        title="Hàng mới"
                      >
                        <i></i>Hàng mới
                      </a>
                    </li>
                    <li
                      className={
                        isActive === "price-asc"
                          ? "active btn-quick-sort price-asc"
                          : null
                      }
                    >
                      <a
                        onClick={() => sortby("price-asc")}
                        title="Giá thấp đến cao"
                      >
                        <i></i>Giá thấp đến cao
                      </a>
                    </li>
                    <li
                      className={
                        isActive === "price-desc"
                          ? "active btn-quick-sort price-desc"
                          : null
                      }
                    >
                      <a
                        onClick={() => sortby("price-desc")}
                        title="Giá cao xuống thấp"
                      >
                        <i></i>Giá cao xuống thấp
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="sort-cate-left hidden-xs">
                  <h3>Màu sắc:</h3>
                  <ul>
                    {mauSac.map((item, index) => {
                      return (
                        <li
                          className={
                            props?.match?.params?.idMauSac == item.id
                              ? "active btn-quick-sort price-desc"
                              : null
                          }
                        >
                          <a
                            onClick={() => {
                              sortby(isActive, item.id);
                            }}
                            title={item.ten_mau_sac}
                          >
                            <i></i>
                            {item.ten_mau_sac}
                            <img
                              className="imgMauSac"
                              width={"20px"}
                              height={"20px"}
                              src={`https://apidoan.herokuapp.com/images/${item.hinh_anh}`}
                            ></img>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="shopee-filter-group shopee-price-range-filter shopee-price-range-filter--vn">
                  <div className="shopee-filter-group__header shopee-price-range-filter__header">
                    Khoảng Giá
                  </div>
                  <div className="shopee-filter-group__body shopee-price-range-filter__edit">
                    <div className="shopee-price-range-filter__inputs">
                      <input
                        type="text"
                        className="shopee-price-range-filter__input"
                        placeholder="từ"
                        name="gia"
                        value={tu}
                        onChange={(e)=> {
                         settu(e.target.value)
                        }}
                      />
                      <div className="shopee-price-range-filter__range-line"></div>
                      <input
                        type="text"
                        className="shopee-price-range-filter__input"
                        placeholder="đến"
                        value={den}
                        onChange={(e)=> {setden(e.target.value)}}
                      />
                    </div>
                  </div>
                  <button
                    className="shopee-button-solid shopee-button-solid--primary ubfyUF"
                    onClick={()=>sortby(isActive, props?.match?.params?.idMauSac, tu, den)}
                  >
                    Áp dụng
                  </button>
                </div>
              </div>
              <div className="row">
                {data.length > 0 && data[0].mausac.length > 0 ? (
                  data.map((item, index) => {
                    const d = item?.mausac[0]?.hinh_anh.split(",");
                    let arr = [];
                    if (d?.length) {
                      for (var i = 0; i < d.length; i++) {
                        arr.push(d[i]);
                      }
                    }
                    let stemp = null;
                    let stemps = 0;
                    if (dataKM.length > 0) {
                      const filter = dataKM.filter(
                        (items) => items.id_giay === item.id
                      );

                      if (filter.length > 0) {
                        stemp = filter[0].phan_tram;
                      } else {
                        stemp = null;
                      }
                    }
                    if (stemp) {
                      stemps =
                        stemp !== null
                          ? item.gia_ban - (item.gia_ban * stemp) / 100
                          : 0;
                    }

                    return (
                      <div
                        key={item.id}
                        className="height-margin col-xs-6 col-sm-4 col-md-4 col-lg-3 col-xl-2"
                      >
                        <Link
                          to={`/XemSamPham/${item.id}`}
                          className="title-hp"
                        >
                          <div className="one-procuts">
                            <div className="width-image">
                              <img
                                className="img"
                                src={`${apiImage.API_ENPOINT}/images/${arr[0]}`}
                              />
                            </div>

                            <div className="name-price">
                              <div className="name-product">
                                {item.ten_giay}
                              </div>
                              <div
                                className={
                                  stemps !== 0
                                    ? `price-product amount`
                                    : ` price-product`
                                }
                              >
                                {`${item.gia_ban
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`}
                              </div>
                              <div className={` price-product`}>
                                {stemps ? (
                                  `${stemps
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })
                ) : (
                  <div></div>
                )}
              </div>
              <div className="col-sm-12">
                <div className="pagination">
                  <Pagination
                    prevPageText="prev"
                    nextPageText="next"
                    activePage={activePage}
                    itemsCountPerPage={12}
                    totalItemsCount={allPage}
                    pageRangeDisplayed={12}
                    onChange={handlePageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  return renderContent();
}

ThuongHieuTC.propTypes = {};

export default ThuongHieuTC;
