

$(document).ready(function () {
    $("#edit-profile").click(function () {
        email = $("#email_link").attr('href').split("/")[2];
        link = "/edit-profile/" + email;
        window.open(link, 'newwindow', 'width=800,height=600');
        return false;
    });

    $("#delete-profile").click(function () {
        email = $("#email_link").attr('href').split("/")[2];
        $.post(
            "/delete_profile",
            { input: { email: email } },
            function (data, status) {
                if (status === 'success') {
                    data;
                }
            }
        )
        window.location.href = "/";
    });
});