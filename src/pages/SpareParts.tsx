import AdminLayout from "../layout/AdminLayout.tsx";
import Header from "../components/header/Header.tsx";
import Table from "../components/table/Table.tsx";
import Pagination from "../components/pagination/Pagination.tsx";
import {useState} from "react";
import {IDataPopapp, IDataTable} from "../assets/type/type.ts";
import PopappDelete from "../components/popapp/popapp-delete/PopappDelete.tsx";
import {dataSpareParts} from "../data/popapp/spare-parts/spare-parts.ts";
import PopappCreateSpareParts from "../components/popapp/popapp-create/PopappCreateSpareParts.tsx";
import {useQuery} from "@tanstack/react-query";
import {sparePartsServices} from "../services/spare_parts.services.ts";

const SpareParts = () => {

    const [search, setSearch] = useState(false);
    const [newData, setNewData] = useState<null | IDataTable[]>(null)
    const [pagination, setPagination] = useState({
        start: 0,
        end: 1
    })
    const [active, setActive] = useState(false);

    const {data, isLoading} = useQuery({
        queryKey: ['get spare-parts'],
        queryFn: () => sparePartsServices.getSpareParts()
    })

    const [popapp, setPopapp] = useState<IDataPopapp>({
        create: false,
        idx: null,
        title: '',
        delete: false
    })

    return (
        <AdminLayout setPopapp={setPopapp} setActive={setActive} active={active} className={'spare-parts'}>
            <Header setActive={setActive} active={active} search={search} setSearch={setSearch} setPopapp={setPopapp} data={data} setNewData={setNewData}
                    name={'create'}/>
            <Table setSearch={setSearch} isLoading={isLoading} setPopapp={setPopapp}
                   data={newData ? newData : !isLoading ? data : []}
                   pagination={pagination} isNewData={!newData ? false : newData.length === 0}/>
            {(((!newData) && !isLoading ? data.length > 10 : [].length) || (newData && newData.length > 10)) && (
                <Pagination
                    setPagination={setPagination}
                    len={Math.ceil((newData && newData.length > 0 ? newData.length : data.length) / 9)}
                />
            )}
            {popapp.create && <PopappCreateSpareParts idx={popapp.idx} setPopapp={setPopapp} data={dataSpareParts}/>}
            {popapp.delete && <PopappDelete popapp={popapp} setPopapp={setPopapp}/>}
        </AdminLayout>
    );
};

export default SpareParts;