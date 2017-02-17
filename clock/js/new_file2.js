function loadHtmlFile(title) {
    switch (title) {
        case 0:
            {
                $("#iframe").attr("src", "iframe.html");
                break;
            }
        case 1:
            {
                $("#iframe").attr("src", "index.html");
                break;
            }
        case 2:
            {
//          	alert('2')
                $("#iframe").attr("src", "new_file.html");
                break;
            }
        case 3:
            {
                $("#iframe").attr("src", "new_file2.html");
                break;
            }
        case 4:
            {
                $("#iframe").attr("src", "iframe.html");
                break;
            }
        case 5:
            {
                $("#iframe").attr("src", "index.html");
                break;
            }
    		}
   }