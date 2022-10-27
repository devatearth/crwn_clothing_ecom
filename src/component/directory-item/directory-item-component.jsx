import { DirectoryItemContainer, Body, BackgroundImage } from './directory-item-styles';
import { useNavigate } from 'react-router-dom';



const DirectoryItem = ({ category }) => {
    const navigate = useNavigate();
    const { imageUrl, title , route } = category;

    const onNavidatehandler = () =>{navigate(route)}
    return (
        <DirectoryItemContainer onClick={onNavidatehandler}>
            <BackgroundImage
                imageUrl={imageUrl}
            />
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    );
}
export default DirectoryItem;