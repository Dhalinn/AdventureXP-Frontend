package com.adventurexpfrontend;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {

    @GetMapping("/")
    public String redirectToActivities() {
        return "redirect:/activities.html";
    }
}

