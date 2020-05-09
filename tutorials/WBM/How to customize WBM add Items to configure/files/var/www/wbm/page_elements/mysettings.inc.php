<!--
Author : SG
-->
<h2>My Settings</h2>

<form id="mysettings_form" action="javascript_requested.php" method="POST">
  <h3>My Settings</h3>
  <div class="config_form_box">
	<div class="config_data_list">
	  <div class="label_value_pair">
		<div class="label_field"><label for="my_publish">Enable Publish:</label></div>
		<div class="value_field"><input id="my_publish" type="checkbox" name="my_publish" value="enabled" ></div>
	  </div>
	  <div class="label_value_pair">
		<div class="label_field"><label for="my_topic">My Topic:</label></div>
		<div class="value_field"><input id="my_topic" class="input_field" type="TEXT" name="my_topic" maxlength="25"  value="" ></div>
	  </div>
	  <div class="label_value_pair">
		<div class="label_field"><label for="my_interval">My Interval:</label></div>
		<div class="value_field"><input id="my_interval" class="input_field" type="TEXT" name="my_interval" maxlength="25"  value="" ></div>
	  </div>
	<p class="button_area">
		<input class="button" type="SUBMIT" value="Submit" name="Submit">          
	</p>		  
  </div>
</form>

<?php include("page_element_general_content.inc.php"); ?>

