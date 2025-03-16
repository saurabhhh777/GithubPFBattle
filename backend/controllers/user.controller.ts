import cheerio from "cheerio";
import axios from "axios";
import { Request, Response } from "express";

export const userAllsubmission = async (req: Request, res: Response): Promise<void> => {
    try {
        const username = req.params.username;

        // Make the request with headers to avoid blocking
        const response = await axios.get(`https://github.com/${username}`, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            },
        });

        console.log("Response Data:", response.data); // Debugging

        if (!response.data) {
            res.status(400).json({
                message: "No data received from GitHub",
                success: false,
            });
            return;
        }

        const $ = cheerio.load(response.data); // Load the HTML
        const contirbutionText = $("h2.f4.text-normal.mb-2").text().trim();

        if (!contirbutionText) {
            res.status(404).json({
                message: "Contribution data not found",
                success: false,
            });
            return;
        }

        res.status(200).json({
            message: "User data fetched successfully",
            success: true,
            data: contirbutionText,
        });

    } catch (error: any) {
        console.log("Error:", error); // Debugging
        if (error.response) {
            // GitHub returned an error (e.g., 404 or 403)
            res.status(error.response.status).json({
                message: error.response.data.message || "Failed to fetch user data",
                success: false,
            });
        } else {
            // Network or other errors
            res.status(500).json({
                message: "Server error, please try again later",
                success: false,
            });
        }
    }
};