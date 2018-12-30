null === localStorage.getItem("gradesPublished") && localStorage.setItem("gradesPublished", "false"), $(".label_light") ? $(".label_light").length != $(".student_row").length && localStorage.setItem("gradesPublished", "true") : localStorage.setItem("gradesPublished", "true");
var message = "";
message = "false" == localStorage.getItem("gradesPublished") ? "Thanks for installing <a target='_blank' href='http://www.sriharshaguduguntla.com/easyloop'>Easy Loop</a>! There are currently no grades published. Please wait until grades are entered into the gradebook." : "Thanks for installing <a target='_blank' href='http://www.sriharshaguduguntla.com/easyloop'>Easy Loop</a>!", "true" != localStorage.getItem("showMessage") && null !== localStorage.getItem("showMessage") || Swal.mixin({
    html: message,
    imageUrl: chrome.extension.getURL("images/easyloop-logo.png"),
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: "Easyloop Logo",
    showCancelButton: !0,
    confirmButtonText: "Next &rarr;",
    cancelButtonText: "Don't show again",
    progressSteps: ["1", "2", "3"]
}).queue([{
    title: "<strong>Welcome to Easy Loop 3.0!</strong>",
    text: message
}, {
    title: "<strong>Usage</strong>",
    html: "Access your <strong>progress report</strong> for a class to begin calculating."
}, {
    title: "<strong>Choose Theme</strong>",
    html: "Choose a theme using the dropdown in the upper right corner."
}]).then(e => {
    e.value ? Swal({
        title: "All done!",
        html: "Don't forget to leave a review for Easy Loop <a target='_blank' href='https://chrome.google.com/webstore/detail/school-loop-easy-loop/kkhpoabcjhecnadcnkgldgpfbncbjfjj?hl=en'>here</a>. Visit the <a target='_blank' href='http://sriharshaguduguntla.com/easyloop'>site</a> for more information.",
        confirmButtonText: "Start"
    }) : e.dismiss === Swal.DismissReason.cancel && localStorage.setItem("showMessage", "false")
});