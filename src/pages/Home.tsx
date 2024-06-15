import AdminLayout from "../layout/AdminLayout.tsx";
import Header from "../components/header/Header.tsx";
import Table from "../components/table/Table.tsx";
import Pagination from "../components/pagination/Pagination.tsx";
import {useState} from "react";
import {dataTruck} from "../data/popapp/create/truck.ts";
import PopappCreateTruck from "../components/popapp/popapp-create/PopappCreateTruck.tsx";
import {IDataPopapp, IDataTable} from "../assets/type/type.ts";
import PopappDelete from "../components/popapp/popapp-delete/PopappDelete.tsx";
import {useQuery} from "@tanstack/react-query";
import {trucksServices} from "../services/trucks.services.ts";

const Home = () => {

    const [search, setSearch] = useState(false);
    const [newData, setNewData] = useState<null | IDataTable[]>(null)
    const [pagination, setPagination] = useState({
        start: 0,
        end: 1
    })
    const [active, setActive] = useState(false);


    const {data: trucks, isLoading} = useQuery({
        queryKey: ['get trucks'],
        queryFn: () => trucksServices.getTrucks()
    })

    const [popapp, setPopapp] = useState<IDataPopapp>({
        create: false,
        idx: null,
        title: '',
        delete: false
    })

    return (
        <AdminLayout className={'home'} setPopapp={setPopapp} active={active} setActive={setActive}>
            <Header setActive={setActive} active={active} search={search} setSearch={setSearch} setPopapp={setPopapp} data={!isLoading ? trucks['card'] : []}
                    setNewData={setNewData} name={'create'}/>
            <Table setSearch={setSearch} setPopapp={setPopapp} isLoading={isLoading}
                   data={newData ? newData : !isLoading ? trucks['card'] : []}
                   isNewData={!newData ? false : newData.length === 0} pagination={pagination}/>
            {!isLoading && (
                (((!newData) && trucks['card'] ? trucks['card'].length > 10 : [].length) || (newData && newData.length > 10)) && (
                    <Pagination
                        setPagination={setPagination}
                        len={Math.ceil((newData && newData.length > 0 ? newData.length : trucks['card'].length) / 9)}
                    />
                )
            )}
            {popapp.create && <PopappCreateTruck idx={popapp.idx} setPopapp={setPopapp} data={dataTruck}/>}
            {popapp.delete && <PopappDelete popapp={popapp} setPopapp={setPopapp}/>}
        </AdminLayout>
    );
};

export default Home;