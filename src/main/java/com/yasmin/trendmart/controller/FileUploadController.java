package com.yasmin.trendmart.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
@RestController
@RequestMapping("/api/upload")
public class FileUploadController {

    private static final String UPLOAD_DIR = "uploads/";

    @PostMapping
    public ResponseEntity<String> uploadImage(
            @RequestParam("file") MultipartFile file
    ) {

        try {

            if (file.isEmpty()) {

                return ResponseEntity.badRequest()
                        .body("Please select a file.");

            }

            if (!file.getContentType().startsWith("image/")) {

                return ResponseEntity.badRequest()
                        .body("Only image files are allowed.");

            }

            String fileName = UUID.randomUUID() + "_" +
                    StringUtils.cleanPath(file.getOriginalFilename());

            Path uploadPath = Paths.get(UPLOAD_DIR);

            if (!Files.exists(uploadPath)) {

                Files.createDirectories(uploadPath);

            }

            Files.copy(
                    file.getInputStream(),
                    uploadPath.resolve(fileName),
                    StandardCopyOption.REPLACE_EXISTING
            );

            return ResponseEntity.ok(
                    "http://localhost:8081/uploads/" + fileName
            );

        } catch (IOException e) {

            return ResponseEntity.internalServerError()
                    .body("Upload failed.");

        }

    }

}
