$(document).ready(function() {

  var quoteRef = new Firebase('http://gamma.firebase.com/giffc/quotes');

  $('#quote_submit').click(function () {
    var quote = $('#quote').val();
    if (quote.length > 600) {
      quote = quote.substring(0,599);
    }
    var quoteSource = $('#quote_source').val();
    var quoteSubmitter = $('#quote_submitter').val();
    var datelog = new Date();
    datelog = datelog.getMonth()+'/'+datelog.getDate()+'/'+datelog.getFullYear();
    quoteRef.push({quote:quote, quoteSource:quoteSource, quoteSubmitter:quoteSubmitter, datelog:datelog});
    $('#quote').val('');
    $('#quote_source').val('');
    $('#quote_submitter').val('');
  });



    // Add a callback that is triggered for each quote.
  quoteRef.on('child_added', function (snapshot) {
    var dailyquote = snapshot.val();
    var date_block = "<div class='quote_block'><div class='date_stamp'>"+dailyquote.datelog+"</div>";
    var submitter_block = "<p class='submitter'>submitted by "+dailyquote.quoteSubmitter+"</p>";
    var quote_block = "<p>"+dailyquote.quote+'</p>';
    var attribution_block = "<p class='attribution'>&mdash; "+dailyquote.quoteSource+"</p></div>";
    var total_block = date_block+submitter_block+quote_block+attribution_block;
    $(total_block).prependTo($('#quotes_stream')); 
/*    $('<div/>').text(dailyquote.quote+' '+dailyquote.datelog).prepend($('<em/>').text(dailyquote.quoteSource+': ')).prependTo($('#quotes_stream')); 
*/
  });

});