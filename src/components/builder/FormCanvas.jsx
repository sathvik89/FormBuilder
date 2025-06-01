import { Droppable, Draggable } from 'react-beautiful-dnd';
import FormField from './FormField';

const FormCanvas = ({ 
  form, 
  onFieldUpdate, 
  onFieldDelete, 
  onFieldSelect, 
  selectedFieldId,
  currentStepIndex = 0
}) => {
  const currentStep = form?.steps?.[currentStepIndex];
  const fields = currentStep?.fields || [];
  
  return (
    <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          
          {/* Form Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {form?.title || 'Untitled Form'}
            </h2>
            {form?.description && (
              <p className="text-gray-600 dark:text-gray-300">
                {form.description}
              </p>
            )}
          </div>

          {/* Step Progress */}
          {form?.steps && form.steps.length > 1 && (
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Step {currentStepIndex + 1} of {form.steps.length}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {Math.round(((currentStepIndex + 1) / form.steps.length) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ 
                    width: `${((currentStepIndex + 1) / form.steps.length) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          )}

          {/* Step Title */}
          {currentStep && (
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {currentStep.title}
              </h3>
            </div>
          )}

          {/* Form Fields Drop Zone */}
          <div className="p-6">
            <Droppable droppableId="form-canvas">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`min-h-96 rounded-xl border-2 border-dashed transition-all duration-300 ${
                    snapshot.isDraggingOver 
                      ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20 scale-[1.02]' 
                      : fields.length === 0
                        ? 'border-gray-300 dark:border-gray-600'
                        : 'border-transparent'
                  }`}
                >
                  {fields.length > 0 ? (
                    <div className="space-y-4">
                      {fields.map((field, index) => (
                        <Draggable
                          key={field.id}
                          draggableId={field.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`transition-all duration-200 ${
                                snapshot.isDragging 
                                  ? 'rotate-1 scale-105 shadow-xl z-50' 
                                  : ''
                              }`}
                              style={{
                                ...provided.draggableProps.style,
                                transform: snapshot.isDragging 
                                  ? `${provided.draggableProps.style?.transform} rotate(1deg)` 
                                  : provided.draggableProps.style?.transform
                              }}
                            >
                              <FormField
                                field={field}
                                isSelected={selectedFieldId === field.id}
                                onSelect={() => onFieldSelect(field.id)}
                                onUpdate={(updates) => onFieldUpdate(field.id, updates)}
                                onDelete={() => onFieldDelete(field.id)}
                                dragHandleProps={provided.dragHandleProps}
                                isDragging={snapshot.isDragging}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-96">
                      <div className="text-center">
                        <div className="text-6xl mb-4 animate-bounce">📝</div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          Start Building Your Form
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-sm">
                          Drag fields from the left panel to create your form
                        </p>
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                          <span>💡</span>
                          <span>Tip: You can reorder fields by dragging them</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCanvas;