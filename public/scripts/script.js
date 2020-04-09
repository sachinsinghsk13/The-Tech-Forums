/// <reference path="jquery-3.4.1.js"/>

$(()=> {
    $('.avtar').click(($event)=> {
        let input = $('#avtarInput');
        let s = $('.avtar img.selected').removeClass('selected');
        let selectedImg = $($event.currentTarget).find('img');
        selectedImg.addClass('selected');
        input.val(selectedImg.attr('data-avtar-id'));
    });

    let tabbedPane = $('.tabbed-pane');
    let tabs = tabbedPane.find('.tab');
    let tabContents = tabbedPane.find('.tab-content');
    $.each(tabs, (index, tab) => {
        $(tab).click(($event) => {
            tabs.removeClass('active');
            $(tab).addClass('active');

            tabContents.removeClass('visible');
            tabContents.filter($(tab).attr('data-target')).addClass('visible');
        })
    });


});