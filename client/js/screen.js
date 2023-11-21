function printBy(selector){
    var $print = $(selector)
        .clone()
        .addClass('print')
        .prependTo('#modalDetails');

    // Stop JS execution
    window.print();

    // Remove div once printed
    $print.remove();
}

