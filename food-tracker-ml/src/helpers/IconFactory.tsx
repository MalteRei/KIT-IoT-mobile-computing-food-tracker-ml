import AddIcon from "../assets/icons/AddIcon";
import CheckmarkIcon from "../assets/icons/CheckmarkIcon";
import DismissIcon from "../assets/icons/DismissIcon";
import Icons from "../models/Icons";

class IconFactory{
    getIcon(icon: Icons): JSX.Element | null{
        switch (icon) {
            case Icons.Dismiss:
                return (<DismissIcon/>);
            case Icons.Checkmark:
                return (<CheckmarkIcon/>);
            case Icons.Add:
                return (<AddIcon/>);
            default:
                return null;
        }
    }
}

export default IconFactory;