/**
 * CSV Upload Component
 * 
 * Handles the upload and processing of the four SDYS softball statistics CSV files:
 * - Offense.csv: Batting statistics
 * - Pitching.csv: Pitching statistics
 * - Defense.csv: Fielding statistics  
 * - Catching.csv: Catcher-specific statistics
 */

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, FileText, CheckCircle, AlertCircle, X } from "lucide-react";
import { processCSVFiles } from '../utils/csvProcessor';
import { Player, TeamStats, FileUploadState } from '../types/csv';

interface CSVUploadProps {
  onDataProcessed: (data: { players: Player[]; teamStats: TeamStats }) => void;
}

interface FileState {
  offense: File | null;
  pitching: File | null;
  defense: File | null;
  catching: File | null;
}

export const CSVUpload: React.FC<CSVUploadProps> = ({ onDataProcessed }) => {
  const [files, setFiles] = useState<FileState>({
    offense: null,
    pitching: null,
    defense: null,
    catching: null,
  });

  const [uploadState, setUploadState] = useState<FileUploadState>({
    isUploading: false,
    progress: 0,
    error: null,
    success: false,
  });

  const [dragActive, setDragActive] = useState(false);

  /**
   * Handles file selection for individual file inputs
   */
  const handleFileSelect = (fileType: keyof FileState, file: File) => {
    setFiles(prev => ({ ...prev, [fileType]: file }));
    setUploadState(prev => ({ ...prev, error: null, success: false }));
  };

  /**
   * Handles drag and drop events
   */
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  /**
   * Handles file drop from drag and drop
   */
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const newFiles: FileState = { ...files };

    droppedFiles.forEach(file => {
      const fileName = file.name.toLowerCase();
      if (fileName.includes('offense')) {
        newFiles.offense = file;
      } else if (fileName.includes('pitching')) {
        newFiles.pitching = file;
      } else if (fileName.includes('defense')) {
        newFiles.defense = file;
      } else if (fileName.includes('catching')) {
        newFiles.catching = file;
      }
    });

    setFiles(newFiles);
    setUploadState(prev => ({ ...prev, error: null, success: false }));
  }, [files]);

  /**
   * Validates that all required files are selected
   */
  const validateFiles = (): boolean => {
    const requiredFiles = ['offense', 'pitching', 'defense', 'catching'] as const;
    const missingFiles = requiredFiles.filter(fileType => !files[fileType]);

    if (missingFiles.length > 0) {
      setUploadState(prev => ({
        ...prev,
        error: `Missing required files: ${missingFiles.join(', ')}`,
      }));
      return false;
    }

    return true;
  };

  /**
   * Processes the uploaded CSV files
   */
  const processFiles = async () => {
    if (!validateFiles()) return;

    setUploadState({
      isUploading: true,
      progress: 0,
      error: null,
      success: false,
    });

    try {
      console.log('Starting file processing...');
      
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadState(prev => ({
          ...prev,
          progress: Math.min(prev.progress + 20, 90),
        }));
      }, 200);

      console.log('Processing files:', {
        offense: files.offense?.name,
        pitching: files.pitching?.name,
        defense: files.defense?.name,
        catching: files.catching?.name,
      });

      const result = await processCSVFiles({
        offense: files.offense!,
        pitching: files.pitching!,
        defense: files.defense!,
        catching: files.catching!,
      });

      clearInterval(progressInterval);

      console.log('Files processed successfully:', result);

      setUploadState({
        isUploading: false,
        progress: 100,
        error: null,
        success: true,
      });

      // Call the callback with processed data
      onDataProcessed(result);

    } catch (error) {
      console.error('Error in processFiles:', error);
      
      setUploadState({
        isUploading: false,
        progress: 0,
        error: error instanceof Error ? error.message : 'Failed to process files',
        success: false,
      });
    }
  };

  /**
   * Clears all selected files
   */
  const clearFiles = () => {
    setFiles({
      offense: null,
      pitching: null,
      defense: null,
      catching: null,
    });
    setUploadState({
      isUploading: false,
      progress: 0,
      error: null,
      success: false,
    });
  };

  /**
   * Renders a file input for a specific file type
   */
  const renderFileInput = (fileType: keyof FileState, label: string, description: string) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center space-x-2">
        <input
          type="file"
          accept=".csv"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileSelect(fileType, file);
          }}
          className="hidden"
          id={`file-${fileType}`}
        />
        <label
          htmlFor={`file-${fileType}`}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm cursor-pointer hover:bg-gray-50 transition-colors"
        >
          {files[fileType] ? (
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-green-700">{files[fileType]?.name}</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-gray-400" />
              <span className="text-gray-500">Select {label} CSV file</span>
            </div>
          )}
        </label>
        {files[fileType] && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFileSelect(fileType, null!)}
            className="text-red-500 hover:text-red-700"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="w-5 h-5" />
          <span>Upload SDYS Statistics Files</span>
        </CardTitle>
        <CardDescription>
          Upload the four required CSV files to load your team's statistics into the dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Drag and Drop Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-medium text-gray-900 mb-2">
            Drag and drop your CSV files here
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Or use the file inputs below to select individual files
          </p>
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
            Supported: Offense, Pitching, Defense, Catching CSV files
          </Badge>
        </div>

        {/* File Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderFileInput(
            'offense',
            'Offense',
            'Batting statistics including hits, runs, RBIs, etc.'
          )}
          {renderFileInput(
            'pitching',
            'Pitching',
            'Pitching statistics including ERA, wins, strikeouts, etc.'
          )}
          {renderFileInput(
            'defense',
            'Defense',
            'Fielding statistics including fielding percentage, errors, etc.'
          )}
          {renderFileInput(
            'catching',
            'Catching',
            'Catcher-specific statistics including passed balls, stolen bases allowed, etc.'
          )}
        </div>

        {/* Progress Bar */}
        {uploadState.isUploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Processing files...</span>
              <span>{uploadState.progress}%</span>
            </div>
            <Progress value={uploadState.progress} className="w-full" />
          </div>
        )}

        {/* Error Message */}
        {uploadState.error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{uploadState.error}</AlertDescription>
          </Alert>
        )}

        {/* Success Message */}
        {uploadState.success && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Files processed successfully! Your team data has been loaded.
            </AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={clearFiles}
            disabled={uploadState.isUploading}
          >
            Clear All
          </Button>
          <Button
            onClick={processFiles}
            disabled={
              uploadState.isUploading ||
              !files.offense ||
              !files.pitching ||
              !files.defense ||
              !files.catching
            }
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {uploadState.isUploading ? 'Processing...' : 'Process Files'}
          </Button>
        </div>

        {/* File Status Summary */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">File Status</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            {Object.entries(files).map(([key, file]) => (
              <div key={key} className="flex items-center space-x-2">
                {file ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                )}
                <span className={file ? 'text-green-700' : 'text-red-700'}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 