# How to customize WBM add items to configure

## Prerequisites

* Windows Environment
* Basic knowledge in HTML, PHP
* Basic linux file commands
* Download [WinSCP](https://www.dropbox.com/s/icrjmxmq1vifq9a/WinSCP-5.17.3-Setup.exe?dl=1) and install
* Download [PuTTY](https://www.dropbox.com/s/d2cbnw42tpbfkaq/putty-0.73-installer.msi?dl=1) and install
* Import WagoConfigToolLIB.lib in e!COCKPIT to access the configuration values

## Open Web-Based-Management (WBM) and configure

1. Open WBM and go to 'Ports and Services'.  
    > Default WAGO PFC username "admin" and password "wago".

2. Enable SSH.  
![WAGO - Enable SSH](./assets/images/enable-ssh.png "Enable SSH")

## Download the neccessary files from WAGO PFC using WinSCP

1. Open WinSCP and Configure Login.  
    a. Select SCP for 'File Protocol', enter WAGO IP address for hostname, and the username and password.  
    b. Port number remain as "22".  

    > Default WAGO PFC username "root" and password "wago".  
![WAGO - Login WinSCP](./assets/images/winscp-login.png "Login WinSCP")

2. Download the respective files to your own folder.  

## Create config file and other files

1. Create your own conf file, mysettings.conf in /etc. This file is to store your configuration values.  

    ```bash
    # /etc/mysettings.conf

    # My settings
    my_publish=no
    my_topic="/wago"
    my_interval=5
    ```

2. Create get_mysettings_conf file for reading values.  
    Download [get_mysettings_conf](./tutorials/WBM/How%20to%20customize%20WBM%20add%20Items%20to%20configure/files/etc/config-tools/get_mysettings_conf) and edit. This file is for WBM to read values in mysettings.conf.

    > Line 21 to 29 - Edit line 23, 25, 27 for each variable values.

    ```bash
    # validate request params
    case $1 in
        my_publish)
            ;;
        my_topic)
            ;;
        my_interval)
            ;;
        *)
    ```

3. Create config_mysettings file for writing values.  
    Download [config_mysettings](./tutorials/WBM/How%20to%20customize%20WBM%20add%20Items%20to%20configure/files/etc/config-tools/config_mysettings) and edit. This file is for WBM to write values to mysettings.conf.

    > Line 18 - Change the file name to what you configured in previous step.

    ```bash
    CONF_FILE="/etc/mysettings.conf"
    ```

    > Line 47 to 49 - Edit the values to be configured.

    ```bash
    PUBLISH=`GetParameterValue my_publish $*`
    TOPIC=`GetParameterValue my_topic $*`
    INTERVAL=`GetParameterValue my_interval $*`
    ```

    > Line 50 to 79 - Edit line 53, 62, 71 for each variable values. Take note there is "c" in second word.  
    >
    > "/^my_publish/**c**my_publish=$PUBLISH"  
    >
    > "/^my_topic/**c**my_topic=$TOPIC"  
    >
    > "/^my_interval/**c**my_interval=$INTERVAL"

    ```bash
    if [ "$status" = "$SUCCESS" ]; then

        # update "my_publish"
        sed -i "/^my_publish/cmy_publish=$PUBLISH" $CONF_FILE
        status=$?
        if [ "$status" != "$SUCCESS" ]; then
            status=$SHELL_ERROR
            ReportError $status
            SetLastError "Error while writing mysettings config file"
        fi

        # update "my_topic"
        sed -i "/^my_topic/cmy_topic=$TOPIC" $CONF_FILE
        status=$?
        if [ "$status" != "$SUCCESS" ]; then
            status=$SHELL_ERROR
            ReportError $status
            SetLastError "Error while writing mysettings config file"
        fi

        # update "my_interval"
        sed -i "/^my_interval/cmy_interval=$INTERVAL" $CONF_FILE
        status=$?
        if [ "$status" != "$SUCCESS" ]; then
            status=$SHELL_ERROR
            ReportError $status
            SetLastError "Error while writing mysettings config file"
        fi

    fi
    ```

## Edit linux sudoers file to let WBM run as sudo

1. Locate the sudoers file in root directory. Append ```/etc/config-tools/config_mysettings,``` after ```www     ALL=NOPASSWD:```.

    ```bash
    # User privilege specification
    www     ALL=NOPASSWD: /etc/config-tools/config_mysettings, /sbin/ifup, .....
    ```

## Edit the WBM JavaScript and PHP files

1. Create [mysettings.js](./tutorials/WBM/How%20to%20customize%20WBM%20add%20Items%20to%20configure/files/var/www/wbm/js/mysettings.js) in ```/var/www/wbm/js```.  

2. Create [device_param_list.js.php](./tutorials/WBM/How%20to%20customize%20WBM%20add%20Items%20to%20configure/files/var/www/wbm/js/device_param_list.js.php) in ```/var/www/wbm/js```.  

    > Line 3673 to 3692.  

    ```javascript
    /*---------------------------------------------------------------------------
    * MySettings
    * ---------------------------------------------------------------------------
    */
    var CreateMySettingsParams = (function()
    {
        deviceParams.Add(
        {
            id                    : 'mysettings',
            exampleValue          : '' ,
            configtoolReadParams  :
            {
                name      : 'get_mysettings_conf',
                parameter : [ 'my_publish=$my_publish',
                    'my_topic=$my_topic',
                    'my_interval=$my_interval' ],
                sudo    :  true
            }
        });
    })();
    ```

3. Edit the file index.php in ```/var/www/wbm/```.  

    3.1 Append `<script type="text/javascript" src="js/mysettings.js"></script>` after `<script type="text/javascript" src="js/opkg.js"></script>`.  

    ```javascript
    <script type="text/javascript" src="js/opkg.js"></script>
    <script type="text/javascript" src="js/mysettings.js"></script>
    ```

    3.2 Append `new MySettingsContent('mysettings'),` after `var content = new Array(`.  

    ```javascript
    var content = new Array(
      new MySettingsContent('mysettings'),
      new InformationContent('information'),
    ```

4. Edit the file frontend_config_wbm.xml in ```/var/www/wbm/```.  

    Add the following code to the place you want the link to display at WBM.  

    ```xml
    <level id="mysettings" uid="MYSETTINGS">
      <nav ressource="index.php" text="My Settings" user_level="2" fragment="mysettings"/>
    </level>
    ```

    > Example, to display above Diagnostic

    ```xml
    <level id="mysettings" uid="MYSETTINGS">
      <nav ressource="index.php" text="My Settings" user_level="2" fragment="mysettings"/>
    </level>
    <level id="diagnostic" uid="DIAGNOSTIC">
      <nav ressource="index.php" text="Diagnostic" user_level="0" fragment="diagnostic"/>
    </level>
    ```

## Access WBM and change the configuration values
