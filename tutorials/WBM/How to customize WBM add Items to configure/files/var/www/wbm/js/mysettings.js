/*
 * functions for read and write data for WBM content "mysettings"
 */

function MySettingsContent(id)
{
  var mysettingsContent = this;
  
  mysettingsContent.id = id || 'mysettings';
  
  /*
   * local function for display of special values
   */
  var UpdateCheckBox = function(paramStatus, paramValue, outputElementId)
  {
    $(outputElementId).removeAttr('checked');
    
    if((SUCCESS === paramStatus) && ('yes' === paramValue))
    {
      $('#' + outputElementId).attr('checked', true);
    }
  };  

 
  /*
   * definitions for display of parameters
   */
  var CreateMySettingsParamView = (function()
  {
    mysettingsContent.paramView = new DeviceParamView();
	
    mysettingsContent.paramView.Add(
    {
      paramId         : 'my_publish',
      outputElementId : mysettingsContent.id + '_content #my_publish',
	  outputFkt       : UpdateCheckBox
    });
    
    mysettingsContent.paramView.Add(
    {
      paramId         : 'my_topic',
      outputElementId : mysettingsContent.id + '_content #my_topic'
    });
    
    mysettingsContent.paramView.Add(
    {
      paramId         : 'my_interval',
      outputElementId : mysettingsContent.id + '_content #my_interval'
    });
        
  })();

 
  /*
   * first creation of MySettings content area - add events for form processing
   */
  $('#content_area').bind(mysettingsContent.id + '_create', function(event)
  {        
    $("#mysettings_form").bind('submit', function(event)
    {
      event.preventDefault();
      mysettingsContent.ChangeMySettingsConf(this);
    });
  });

  
  /*
   * event - refresh of MySettings content area
   */
  $('#content_area').bind(mysettingsContent.id + '_refresh', function(event)
  {
    mysettingsContent.Refresh();
  });

};

  
/*
 * read and show all parameters necessary for whole MySettings content
 * because all MySettings parameters are addicted to each other, it is necessary to read them all
 * even if only one has changed
 */
MySettingsContent.prototype.Refresh = function()
{
  var mysettingsContent = this;

  deviceParams.ReadValueGroup(mysettingsContent.paramView.list, function()
  {
    mysettingsContent.paramView.ShowValues();

    if(deviceParams.ReadErrorOccured(mysettingsContent.paramView.list)) 
    {
      var errorString = deviceParams.CollectedErrorStrings(mysettingsContent.paramView.list);
      $('body').trigger('event_errorOccured', [ 'Error while reading MySettings data.', errorString ] );
    };
  });
};


/*
 * functions for changing MySettings configuration data
 */
MySettingsContent.prototype.ChangeMySettingsConf = function(formObj)
{
  var mysettingsContent = this;

  pageElements.ShowBusyScreen("Changing MySettings configuration...");
  
  // get script parameter from form data - given, but empty strings must be converted to "" to let the script
  // know, that this parameter value should be deleted. 
  var mysettings_my_publish  = ($(formObj).find('[id=mysettings_my_publish]:checked').length) ? 'yes' : 'no';  
  var mysettings_my_topic = $(formObj).find('input#mysettings_my_topic').val()  || "\"\"";
  var mysettings_my_interval = $(formObj).find('input#mysettings_my_interval').val()  || "\"\"";

  var newValueList  = { mysettings_publish: mysettings_my_publish,
						mysettings_topic: mysettings_my_topic,
						mysettings_interval: mysettings_my_interval };
						
  deviceParams.ChangeValue('config_mysettings', newValueList, function(status, errorText)
  {
    pageElements.RemoveBusyScreen();
    if(SUCCESS != status)
    {
      $('body').trigger('event_errorOccured', [ 'Error while changing MySettings configuration.', errorText ]);
    }
  });   
  mysettingsContent.Refresh();
};
