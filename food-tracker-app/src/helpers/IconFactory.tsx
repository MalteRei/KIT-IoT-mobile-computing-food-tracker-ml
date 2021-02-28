import React from "react";
import AddIcon from "../assets/icons/AddIcon";
import CheckmarkIcon from "../assets/icons/CheckmarkIcon";
import ChevronLeftIcon from "../assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "../assets/icons/ChevronRightIcon";
import DismissIcon from "../assets/icons/DismissIcon";
import NotebookIcon from "../assets/icons/NotebookIcon";
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
            case Icons.ChevronLeft:
                return (<ChevronLeftIcon/>);
            case Icons.ChevronRight:
                return (<ChevronRightIcon/>);
            case Icons.Notebook:
                return (<NotebookIcon/>);
            default:
                return null;
        }
    }
}

export default IconFactory;