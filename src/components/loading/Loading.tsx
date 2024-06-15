import {ILoading} from "../../assets/type/type.ts";

const Loading = ({image = 'truck.svg'}: ILoading) => {
    return (
        <div className={'loading'}>
            <img
                className={'img loading_img-product'}
                src={`/image/loading/${image}`}
                alt={image.slice(0, image.split('').indexOf('.'))}
                draggable={false}
            />
            <img
                className={`img loading_img ${image ? 'paused' : ''}`}
                src={'/image/loading/loading.svg'}
                alt="loading"
                draggable={false}
            />
        </div>
    );
};

export default Loading;