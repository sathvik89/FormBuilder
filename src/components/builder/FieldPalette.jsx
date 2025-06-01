"use client";

import { Draggable, Droppable } from "@hello-pangea/dnd";
import { DEFAULT_FIELDS } from "../../data/fieldTypes";

const FieldPalette = () => {
  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 overflow-y-auto">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Form Fields
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Drag fields to add them to your form
        </p>
      </div>

      <Droppable droppableId="field-palette" isDropDisabled={true}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-3"
          >
            {DEFAULT_FIELDS.map((field, index) => (
              <Draggable
                key={field.type}
                draggableId={`palette-${field.type}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-grab transition-all duration-200 border border-gray-200 dark:border-gray-600 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-500 ${
                      snapshot.isDragging
                        ? "shadow-lg rotate-2 bg-blue-50 dark:bg-blue-900/30 border-blue-400"
                        : ""
                    }`}
                    style={provided.draggableProps.style}
                  >
                    <div className="flex items-center flex-1">
                      <span className="text-2xl mr-3">{field.icon}</span>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm">
                          {field.label}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {field.type === "text" && "Single line input"}
                          {field.type === "textarea" && "Multi-line text"}
                          {field.type === "email" && "Email validation"}
                          {field.type === "phone" && "Phone number"}
                          {field.type === "dropdown" && "Select options"}
                          {field.type === "checkbox" && "True/false choice"}
                          {field.type === "date" && "Date picker"}
                          {field.type === "number" && "Numeric input"}
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-400 dark:text-gray-500">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                      </svg>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default FieldPalette;
