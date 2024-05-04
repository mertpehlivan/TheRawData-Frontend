import { Icon } from '@iconify/react';
import React from 'react'

function ChipIconComponent({ publicationType }) {
    switch (publicationType) {
        case "Article":
            return <Icon icon="material-symbols:article" width={20} height={20} />;
        case "Chapter in a Book":
            return <Icon icon="grommet-icons:chapter-add" width={20} height={20} />;
        case "Chapter in Book":
            return <Icon icon="grommet-icons:chapter-add" width={20} height={20} />;
        case "Company Test Report":
            return <Icon icon="charm:search" width={20} height={20} />;
        case "Conference Paper":
            return <Icon icon="game-icons:video-conference" width={20} height={20} />;
        case "Research Project":
            return <Icon icon="charm:search" width={20} height={20} />;
        case "Thesis":
            return <Icon icon="vaadin:diploma-scroll" width={20} height={20} />;
        default:
            return {}; // Boş nesne döndürün
    }
}


export default ChipIconComponent
