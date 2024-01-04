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

  if(isset($_POST['Full_Name'])) {

    include 'setup_mail.php';
    define('SMTP_USERNAME', 'vendas@duriouniformes.com');
    define('SMTP_PASSWORD', 'e2m$=*JCVLv.');

    function died($error) {
      echo "Sorry, but there were error(s) found with the form you submitted. ";
      echo "These errors appear below.<br /><br />";
      echo $error."<br /><br />";
      echo "Please go back and fix these errors.<br /><br />";
      die();
    }

    $full_name = htmlspecialchars(filter_input(INPUT_POST, 'Full_Name', FILTER_SANITIZE_STRING));
    $telephone = htmlspecialchars(filter_input(INPUT_POST, 'Telephone_Number', FILTER_SANITIZE_STRING));
    $email_from = htmlspecialchars(filter_input(INPUT_POST, 'Email_Address', FILTER_SANITIZE_EMAIL));
    $antispam = htmlspecialchars(filter_input(INPUT_POST, 'AntiSpam', FILTER_SANITIZE_STRING));

    $email_subject = "Contato via WhatsApp (website)";

    $error_message = "";

    if (empty($full_name) || empty($telephone) || empty($email_from) || empty($antispam)) {
      died('Sorry, there appears to be a problem with your form submission.');		
    }

    if(strlen($full_name) < 2) {
      $error_message .= 'Seu nome não parece ser válido.<br />';
    }
    
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

    if(preg_match($email_exp, $email_from)==0) {
      $error_message .= 'O endereço de e-mail que você digitou não parece ser válido.<br />';
    }

    if($antispam <> $antispam_answer) {
    $error_message .= 'A resposta do Anti-Spam que você digitou não está correta.<br />';
    }

    if(strlen($error_message) > 0) {
      died($error_message);
    }

    $LN = "<br>";
    $email_message = "Contato capturado via botão WhatsApp (website):".$LN.$LN;

    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:");
      return str_replace($bad,"",$string);
    }

    $email_message .= "Nome: ".clean_string($full_name).$LN;
    $email_message .= "Telefone: ".clean_string($telephone).$LN;
    $email_message .= "Email: ".clean_string($email_from).$LN;

    require_once('class.phpmailer.php'); 

    $mail = new PHPMailer();

    $mail = new PHPMailer();

    $mail->IsSMTP(); // use smtp connection to send email
    $mail->Host       = "mail.duriouniformes.com"; // set up the SMTP host name
    $mail->SMTPDebug  = 0; // SMTP debug info : 1 = errors+messages 2 = msg only
    $mail->SMTPAuth   = true; // enable SMTP authentication
    $mail->SMTPSecure = "tls"; // sets the prefix to the servier
    $mail->Port       = 587; // set the SMTP port 
    $mail->Username   = SMTP_USERNAME;
    $mail->Password   = SMTP_PASSWORD;
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
      echo "Desculpe, ocorreu um erro ao enviar seu e-mail. Por favor, tente novamente mais tarde.";
      echo "Erro: " . $mail->ErrorInfo;
    } else {
      ob_end_clean();  // Limpa o buffer de saída
      ?>
      <script>location.replace('<?php echo $thankyou;?>')</script>
      <?php
    }
  }
  die();
?>
