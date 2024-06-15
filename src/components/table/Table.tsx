import {memo} from "react";
import {head} from '../../data/table.json'
import {ITable} from "../../assets/type/type.ts";
import Update from "../../UI/icon/Update.tsx";
import Dell from "../../UI/icon/Dell.tsx";
import {useLocation} from "react-router-dom";
import Loading from "../loading/Loading.tsx";
import Button from "../../UI/button/Button.tsx";


const Table = ({data, setPopapp, isNewData, setSearch, isLoading, nameTable = 'truck', pagination}: ITable) => {
    const {pathname} = useLocation();
    console.log(isNewData)
    return (
        <div className={'table-wrapper'}>
            <div className="container table-wrapper_container">
                <div className={`table-${nameTable} table`}>
                    <div className={`table-head`}>
                        {head.map(({name}, idx) => (
                            <div className={`table-content_title`} key={name + idx}>{name}</div>
                        ))}
                    </div>
                    <div className={`table-body`}>
                        {!isLoading ? (
                            data && data.length ?
                                data
                                    .slice(data.length > 9 ? pagination.start * 9 : undefined, data.length > 9 ? pagination.end * 9 : undefined)
                                    .map((product, idx) => (
                                        <div className={`table-content content`} key={product.image + idx}>
                                            <div className={`table-content_image`}>
                                                <img className={'image'} src={product.image}
                                                     alt={product.title}
                                                     draggable={false}/>
                                            </div>
                                            <div className={`table-content_title`}>{product.title}</div>
                                            <div className={`table-content_price`}>
                                                {`${Intl.NumberFormat('ru-RU').format(product.price)} руб.`}
                                            </div>
                                            <div className={`table-content_btn`}>
                                                <button onClick={() => setPopapp((prev) => ({
                                                    ...prev, create: true, idx: product.id
                                                }))} className={'btn-update'}><Update/></button>
                                                <button onClick={() => setPopapp(prev => ({
                                                    ...prev,
                                                    delete: true,
                                                    idx: product.id,
                                                    title: product.title
                                                }))} className={'btn-dell'}><Dell/></button>
                                            </div>
                                        </div>
                                    )) : (
                                    <>
                                        <p>
                                            Нет
                                                ни {pathname === '/admin' ? 'одного грузовика' : 'одной запчасти'}!
                                        </p>
                                        {isNewData && (
                                                <Button onClick={() => setSearch(true)}
                                                             className={'btn'}>Очистить</Button>
                                        )}
                                    </>
                                )
                        ) : (
                            <div className={'isLoading'}>
                                <Loading image={pathname === '/admin' ? 'truck.svg' : 'spare-parts.png'}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Table);