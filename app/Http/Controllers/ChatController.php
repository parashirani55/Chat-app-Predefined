<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChatController extends Controller
{
    private $chatMap = [
        "hi" => [
            "reply" => "Hello! How can I help you today?",
            "suggestions" => ["sales question", "technical question", "talk to agent"],
        ],
        "sales question" => [
            "reply" => "Sure! Our sales team can assist you with any product-related queries or bulk orders.",
            "suggestions" => ["what is the price of product", "do i get discount", "technical question"],
        ],
        "what is the price of product" => [
            "reply" => "The price varies by product. Can you mention the product you're interested in?",
            "suggestions" => ["do i get discount", "sales question", "talk to agent"],
        ],
        "do i get discount" => [
            "reply" => "Yes! We offer bulk discounts. Let me connect you with our sales team.",
            "suggestions" => ["sales question", "pricing details", "talk to agent"],
        ],
        "technical question" => [
            "reply" => "Please tell me your technical issue. Our tech team will guide you.",
            "suggestions" => ["how to create account", "how to reset password", "sales question"],
        ],
        "how to create account" => [
            "reply" => "Just click on the 'Sign Up' button on the top right and follow the steps!",
            "suggestions" => ["how to reset password", "login help", "technical question"],
        ],
        "how to reset password" => [
            "reply" => "Click on ‘Forgot Password’ on the login page and follow the instructions to reset it.",
            "suggestions" => ["try login again", "need more help", "talk to agent"],
        ],
        "talk to agent" => [
            "reply" => "Sure, connecting you with a live agent now...",
            "suggestions" => ["hi", "sales question", "technical question"],
        ],
        "login help" => [
            "reply" => "If you have trouble logging in, ensure your email and password are correct.",
            "suggestions" => ["how to reset password", "technical question", "talk to agent"],
        ],
        "pricing details" => [
            "reply" => "We offer multiple pricing tiers based on features. Want me to send you the full breakdown?",
            "suggestions" => ["yes please", "sales question", "talk to agent"],
        ],
        "yes please" => [
            "reply" => "Here is the detailed pricing page: [link] 📄",
            "suggestions" => ["sales question", "talk to agent", "hi"],
        ],
        "need more help" => [
            "reply" => "Sure! Please describe your issue, and I’ll do my best to assist or connect you with a human.",
            "suggestions" => ["technical question", "sales question", "talk to agent"],
        ],
            "sales question" => [
        "reply" => "Sure! Our sales team can assist you with any product-related queries or bulk orders.",
        "suggestions" => ["what is the price of product", "do i get discount if i buy more than 1 product", "technical question"],
    ],

    "technical question" => [
        "reply" => "Please tell me your technical issue. Our tech team will guide you.",
        "suggestions" => ["how do i create an account", "how do i reset my password if i forgot it", "sales question"],
    ],

    "what is the price of product" => [
        "reply" => "The price varies by product. Can you mention the product you're interested in?",
        "suggestions" => ["do i get discount if i buy more than 1 product", "sales question", "talk to agent"],
    ],

    "do i get discount if i buy more than 1 product" => [
        "reply" => "Yes, we offer special pricing for bulk purchases! Our sales team can give you the best deal.",
        "suggestions" => ["sales question", "pricing details", "talk to agent"],
    ],

    "how do i create an account" => [
        "reply" => "Just click the 'Sign Up' button on the top right corner and follow the instructions.",
        "suggestions" => ["how do i reset my password if i forgot it", "login help", "technical question"],
    ],

    "how do i reset my password if i forgot it" => [
        "reply" => "Click on ‘Forgot Password’ on the login page and follow the instructions to reset your password.",
        "suggestions" => ["try login again", "need more help", "talk to agent"],
    ],
];

    public function sendMessage(Request $request)
    {
        $message = strtolower(trim($request->input('message')));
        $response = $this->chatMap[$message] ?? [
            "reply" => "I'm sorry, I didn’t understand that.",
            "suggestions" => ["hi", "sales question", "technical question"]
        ];

        return response()->json([
            "reply" => $response["reply"],
            "typing" => true,
            "delay" => 1200,
            "suggestions" => $response["suggestions"],
        ]);
    }
}
