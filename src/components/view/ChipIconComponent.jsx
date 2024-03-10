import { Icon } from '@iconify/react';
import React from 'react'

function ChipIconComponent({ publicationType }) {
    switch (publicationType) {
        case "Article":
            return <Icon icon="material-symbols:article" width={20} height={20} />
            break;
        case "Chapter In A Book":
            return <Icon icon="material-symbols:article" width={20} height={20} />
            break;
        case "Company Test Report":
            return <Icon icon="charm:search" width={20} height={20}/>
            break;
        case "Conference Paper":
            return <Icon icon="game-icons:video-conference"width={20} height={20} />
            break;
        case "Research Project":
            return <Icon icon="charm:search" width={20} height={20} />
            break;
        case "Thesis":
            return <Icon icon="vaadin:diploma-scroll" width={20} height={20} />
            break;
        default:
            break;
    }
    return (
        {

        }
    )
}

export default ChipIconComponent
