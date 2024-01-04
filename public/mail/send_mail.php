<?php
/**
 * 
 * URL: www.freecontactform.com
 * 
 * Version: FreeContactForm Free V2.1
 * 
 * Copyright (c) 2012 Stuart Cochrane
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 * 
 * Note: This is NOT the same code as the PRO version
 * 
 **/

$captcha = isset($_POST['g-recaptcha-response']) ? $_POST['g-recaptcha-response'] : null;

if(!is_null($captcha)){
	$res = json_decode(file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=6Lci5ywpAAAAAJ5HUYR7kKup3nZDKp6btBvs8XAK&response=".$captcha."&remoteip=".$_SERVER['REMOTE_ADDR']));
	if($res->success === true){
		//CAPTCHA validado!!!
		echo "It's OK! =^)";
	} else {
		echo 'Error! Invalid Captcha!<br/>';
		echo "<a href=\"javascript:history.go(-1)\">GO BACK</a>";
		die();
	}
}

if(isset($_POST['Email_Address'])) {

	include 'setup_mail.php';

	function died($error) {
		echo "Sorry, but there were error(s) found with the form you submitted. ";
		echo "These errors appear below.<br /><br />";
		echo $error."<br /><br />";
		echo "Please go back and fix these errors.<br /><br />";
		die();
	}

	if(
		!isset($_POST['Full_Name']) ||
		!isset($_POST['Email_Address']) ||
		!isset($_POST['Telephone_Number']) ||
		!isset($_POST['Your_Message']) || 
		!isset($_POST['AntiSpam']) 
		) {
		died('Sorry, there appears to be a problem with your form submission.');		
	}

	$full_name 			= $_POST['Full_Name'];  //required 
	$email_from 		= $_POST['Email_Address']; // required
	$telephone 			= $_POST['Telephone_Number']; // required
	$your_msg 			= $_POST['Your_Message']; // required
	$antispam 			= $_POST['AntiSpam']; // required
	$email_subject 	= $_POST['Email_Subject']; // required 
	$error_message 	= "";

  if(strlen($full_name) < 2) {
  	$error_message .= 'Your Name does not appear to be valid.<br />';
  }
	$email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
  if(preg_match($email_exp, $email_from)==0) {
  	$error_message .= 'The Email Address you entered does not appear to be valid.<br />';
  }
  if(strlen($your_msg) < 2) {
  	$error_message .= 'The Comments you entered do not appear to be valid.<br />';
  } 
  if($antispam <> $antispam_answer) {
	$error_message .= 'The Anti-Spam answer you entered is not correct.<br />';
  }
 
  if(strlen($error_message) > 0) {
  	died($error_message);
  }
	$LN = "<br>";
	$email_message = "Contato enviado por:".$LN.$LN;

	function clean_string($string) {
	  $bad = array("content-type","bcc:","to:","cc:");
	  return str_replace($bad,"",$string);
	}

	$email_message .= "Nome: ".clean_string($full_name).$LN;
	$email_message .= "Email: ".clean_string($email_from).$LN;
	$email_message .= "Telefone: ".clean_string($telephone).$LN.$LN;
	$email_message .= "Mensagem: ".$LN.clean_string($your_msg).$LN;


require_once('class.phpmailer.php'); 
// include("class.smtp.php");  // optional, gets called from within classe.phpmailer.php if not already loaded

$mail = new PHPMailer();

$mail->IsSMTP(); // use smtp connection to send email
$mail->Host       = "mail.duriouniformes.com"; // set up the SMTP host name
$mail->SMTPDebug  = 0; // SMTP debug info : 1 = errors+messages 2 = msg only
$mail->SMTPAuth   = true; // enable SMTP authentication
$mail->SMTPSecure = "tls"; // sets the prefix to the servier
$mail->Port       = 587; // set the SMTP port 
$mail->Username   = "vendas@duriouniformes.com";  // username
$mail->Password   = "e2m$=*JCVLv."; // password
$mail->SetFrom('vendas@duriouniformes.com', 'Du Rio Uniformes');
$mail->AddReplyTo($email_from);
$mail->Subject    = clean_string($email_subject);
$mail->AltBody    = "To view the message, please use an HTML compatible email viewer!"; // optional, comment out and test
$mail->CharSet = "UTF-8"; //"iso-8859-1";
$mail->MsgHTML($email_message);
$mail->AddAddress($email_to, "Du Rio Uniformes");
$mail->addCC($email_cc, "Du Rio Uniformes");
$mail->addBCC($email_bcc, "Du Rio Uniformes");

if (!$mail->send()) {
	echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
	// echo 'Mensagem enviada com sucesso!.';
?>
	<script>location.replace('<?php echo $thankyou;?>')</script>
<?php
}

}
	die();
?>