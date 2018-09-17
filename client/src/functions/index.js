import {isMobile} from 'react-device-detect';

declare var $;

export const isValid = (data) => {
    return data != null && data !== undefined;
}

export const justifyPageMargin = (marginLeft) => {
    if (isMobile && marginLeft === "0px") {
        marginLeft = "42px";
    }
    $("body").css('margin-left', marginLeft)
}
