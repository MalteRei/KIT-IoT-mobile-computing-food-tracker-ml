import DismissIcon from "../assets/icons/DismissIcon";
import Icons from "../models/Icons";

class IconFactory{
    getIcon(icon: Icons): JSX.Element | null{
        switch (icon) {
            case Icons.Dismiss:
                return (<DismissIcon/>);
            default:
                return null;
        }
    }
}

export default IconFactory;