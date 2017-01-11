class GanttChartsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
  end

  def edit
    @gantt_chart = GanttChart.find_by_uid(params[:uid])
  end

  def new
    @gantt_chart = GanttChart.new
  end

  def update
    @gantt_chart = GanttChart.find(params[:id])
    gantt_params = params[:gantt_chart].permit('name', 'start', 'end')

    begin
      @gantt_chart.update!(gantt_params) 
    rescue ActiveRecord::RecordInvalid => e
      flash.alert = e.message
      return redirect_to edit_gantt_chart_path
    end

    redirect_to show_gantt_chart_path(@gantt_chart.uid)
  end

  def create
    gantt_params = params[:gantt_chart].permit('name', 'start', 'end')

    begin
      @gantt_chart = GanttChart.create!(gantt_params)
    rescue ActiveRecord::RecordInvalid => e
      flash.alert = e.message
      return redirect_to new_gantt_chart_path
    end

    redirect_to show_gantt_chart_path(@gantt_chart.uid)
  end

  def save_tasks
    @gantt_chart = GanttChart.find_by_uid(params[:uid])

    puts 'save_tasks'

    tasks = params[:tasks].map do |task|
      {
        name: task[:name],
        start: task[:start],
        end:  task[:end] 
      } 
    end

    puts 'tasks'
    puts tasks

    unless tasks
      return render json: { success: false }
    end

    @gantt_chart.tasks.destroy_all
    puts tasks
    @gantt_chart.tasks.create!(tasks)

    render json: { success: true }
  end

  def show
    @gantt_chart = GanttChart.find_by_uid(params[:uid])

    @gantt_chart_props = {
      tasks: @gantt_chart.tasks.to_a,
      start: @gantt_chart.start,
      end: @gantt_chart.end
    }
  end
end
