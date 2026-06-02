package org.example.playhubbackend.infrastructure.mail;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender mailSender;

    @Async("emailExecutor")
    public void sendRegistrationEmail(String toEmail, String otpCode) {
        String subject = "Registration OTP Code";
        String content = "Your OTP code is: " + otpCode;
        sendMail(toEmail, subject, content);
    }

    /*
    * Internal method to send email
    * @param toEmail: email of recipient
    * @param subject: subject of email
    * @param content: content of email
    * */
    private void sendMail(String toEmail, String subject, String content) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(content, true);
            mailSender.send(message);
        } catch (MessagingException ex) {
            log.error("Failed to send email to [{}]: {}", toEmail, ex.getMessage(), ex);
            throw new RuntimeException(ex);
        }
    }

}
