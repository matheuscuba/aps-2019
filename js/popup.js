var Assistant = new ReportAssistant({
    url: 'https://www.webhook.site/3b5e9873-2cf7-4d80-8331-488d1d22a060'
});

function ReportAssistant(config)
{
    let self = this;
    
    self.config = {
        url: false,
    };

    self.createEvents = function(){
        let button = document.getElementById('btnSend');
        if(button)
        {
            button.addEventListener("click", function() {
                self.getInfo();
                self.toggleSuccess(true);
            });
        }
    };

    self.toggleSuccess = function(status){
        document.getElementById('success').style.display = "flex";
    };

    self.getInfo = function()
    {
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
            if(tabs)
            {
                chrome.tabs.captureVisibleTab(null, {}, function (image) {

                    var url = tabs[0] ? tabs[0].url : false; 
                    var text = document.getElementById('text').value;
        
                    let data = {
                        image: image,
                        currentURL : url,
                        text: text,
                        userAgent: navigator.userAgent,
                        platform: navigator.platform,
                        language: navigator.language,
                        cookies: navigator.cookieEnabled
                    };
            
                    if(self.config.url)
                        self.post(data);
                });
            }
        });

    };

    self.post = function(data)
    {
        var request = new XMLHttpRequest();
        request.open('POST', self.config.url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send(JSON.stringify(data));
    };

    self.init = function(){
        Object.assign(self.config, config);

        self.createEvents();
    };

    ready(function(){
        self.init();
    });
};

function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}