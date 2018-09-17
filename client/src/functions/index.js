declare var $;

export const isValid = (data) => {
    return data != null && data !== undefined;
}

export const justifyPageMargin = (marginLeft) => {
    $("footer").css('margin-left', marginLeft)
    $(".page").css('margin-left', marginLeft)
    $("#categories-nav").css('margin-left', marginLeft)
}
